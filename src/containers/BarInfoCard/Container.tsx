import React from 'react';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { withLoadingHandler, Query, GET_BAR_FORM_DATA } from '../../graphql';
import { BeerInfoCardStub } from '../BeerInfoCard/style';

import BarInfoCard, { BarRouteParams, BarInfoProps } from './BarInfoCard';

const FIND_BARS = gql`
    query FindBars(
        $name: String
        $openNow: Boolean
        $distance: DistanceSearch
    ) {
        findBars(
            findBarInput: {
                name: $name
                openNow: $openNow
                distance: $distance
            }
        ) {
            name
            id
            openTime
            closeTime
            phone
            address
            barRating {
                rating
            }
            beerList {
                items {
                    price
                    beer {
                        id
                        name
                        avgRating
                    }
                }
            }
        }
    }
`;

const BarInfoCardContainer = (props: RouteComponentProps<BarRouteParams>) => (
    <Query query={GET_BAR_FORM_DATA}>
        {({ data: { barForm: { barName } } }) => (
            <Query query={FIND_BARS} variables={{ name: barName }}>
                {({ data }) => <BarInfoCard {...props} searchResult={data} />}
            </Query>
        )}
    </Query>
);

export default BarInfoCardContainer;
