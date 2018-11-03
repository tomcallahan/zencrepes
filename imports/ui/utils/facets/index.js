import _ from 'lodash';

import {
    formatDate,
    getLastDay,
    populateOpen,
} from '../shared.js';

//import {cfgIssues} from "../../data/Minimongo";

const aggregationsModel = {
    repos: {
        key: 'repo.name',
        name: 'Repositories',
        nested: false,
        aggregations: {}
    },
    orgs: {
        key: 'org.name',
        name: 'Organizations',
        nested: false,
        aggregations: {}
    },
    states: {
        key: 'state',
        name: 'States',
        nested: false,
        aggregations: {}
    },
    authors: {
        key: 'author.login',
        name: 'Authors',
        nested: false,
        aggregations: {}
    },
    milestones: {
        key: 'milestone.title',
        name: 'Milestones',
        nullValue: 'NO MILESTONE',
        nullFilter: {'milestone': { $eq : null }},
        nested: false,
        aggregations: {}
    },
    milestonesStates: {
        key: 'milestone.state',
        name: 'Milestones States',
        nested: false,
        aggregations: {}
    },
    assignees: {
        key: 'assignees',
        name: 'Assignees',
        nullValue: 'UNASSIGNED',
        nullFilter: {'assignees.totalCount': { $eq : 0 }},
        nested: true,
        nestedKey: 'login',
        aggregations: {}
    },
    labels: {
        key: 'labels',
        name: 'Labels',
        nullValue: 'NO LABEL',
        nullFilter: {'labels.totalCount': { $eq : 0 }},
        nested: true,
        nestedKey: 'name',
        aggregations: {}
    },
};

/*
*
* initFacets() Build facets from a query
*
* Arguments:
* - query: Query used as source for facets building
* - cfgIssues: Minimongo instance
*/
export const buildFacets = (query, cfgIssues) => {
    let aggregations = Object.entries(aggregationsModel).map(([facet, content]) => {
        return content
    });

    return aggregations.map((facet) => {
        return {
            ...facet,
            values: buildFacetValues(query, cfgIssues, facet).sort((a, b) => b.issues.length - a.issues.length)
        };
    });
};

/*
*
* buildFacetValues() Build all facet values corresponding to a particular query
*
* Arguments:
* - query: Query used as source for facets building
* - cfgIssues: Minimongo instance
*/
const buildFacetValues = (query, cfgIssues, facet) => {
    //1- Query Manipulation
    let facetQuery = JSON.parse(JSON.stringify(query));
    let queryElement = facet.key;
    if (facet.nested === true) {
        queryElement = facet.key + '.edges';
    }
    if (facetQuery[queryElement] !== undefined) {
        delete facetQuery[queryElement];
    }

    /*
    {
    "assignees.edges":{"$elemMatch":{"node.login":{"$in":["lepsalex","hlminh2000"]}}}
    ,"milestone.state":{"$in":["OPEN"]}
    ,"org.name":{"$in":["Human Cancer Models Initiative - Catalog","Kids First Data Resource Center"]}}
    */

    let statesGroup = {};
    if (facet.nested === true) {
        let allValues = [];
        cfgIssues.find(facetQuery).forEach((issue) => {
            if (issue[facet.key].totalCount === 0) {
                let pushObj = {};
                pushObj[facet.nestedKey] = facet.nullValue;
                allValues.push(pushObj);
            } else {
                issue[facet.key].edges.map((nestedValue) => {
                    if (nestedValue.node[facet.nestedKey] === null || nestedValue.node[facet.nestedKey] === '' || nestedValue.node[facet.nestedKey] === undefined ) {
                        //console.log({...nestedValue.node, name: nestedValue.node.login});
                        allValues.push({...nestedValue.node, name: nestedValue.node.login});
                    } else {
                        allValues.push(nestedValue.node);
                    }
                })
            }
        });
        //console.log(allValues);
        statesGroup = _.groupBy(allValues, facet.nestedKey);
    } else {
        statesGroup = _.groupBy(cfgIssues.find(facetQuery).fetch(), facet.key);
    }
    //console.log(statesGroup);
    // If the key is 'undefined', replace with default facet name
    if (statesGroup['undefined'] !== undefined) {
        statesGroup[facet.nullName] = statesGroup['undefined'];
        delete statesGroup['undefined'];
    }

    return Object.entries(statesGroup)
        .map(([name, content]) => {
            return {
                name: name,
                issues: Object.values(content),
                count: Object.values(content).length,
                points: Object.values(content).map(i => i.points).reduce((acc, points) => acc + points, 0)
            }
        });

};