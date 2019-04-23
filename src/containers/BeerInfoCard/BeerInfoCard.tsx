import React from 'react';
import { map, memoizeWith, identity } from 'ramda';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';

import { BeerForm, FindBeers, FindBeers_findBeers } from '../../@types';
import { ExpandableInfoList, ExpandedInfoCard } from '../../components';

export type BeerInfoProps = {
    searchResult: FindBeers;
} & BeerForm &
    RouteComponentProps;

export const BeerInfoCard = ({
    searchResult,
    history,
    ...other
}: BeerInfoProps) => {
    if (!searchResult.findBeers) {
        return null;
    }

    const expandableInfoCards = memoMapBeerCard(
        history,
        searchResult.findBeers
    );

    return (
        <ExpandableInfoList
            bottomLink="Show bars"
            expandableInfoCards={expandableInfoCards}
            {...other}
        />
    );
};

const mapBeerInfoCards = (
    history: History<any>,
    beers: FindBeers_findBeers[]
) => {

    const handleInfoClick = (beerId: string) => () => {
        history.push(`/beer/${beerId}`);
    };

    return map(({ name, avgRating, strong, type, id }: FindBeers_findBeers) => {
        const labelValues = [
            { label: 'Rating', value: avgRating },
            { label: 'Strong', value: strong },
            { label: 'Type', value: type ? type.name : null },
        ];

        return {
            name,
            labelValues,
            onInfoClick: handleInfoClick(id),
            expandedContent: (
                <ExpandedInfoCard
                    key={id}
                    listName="Bars where you can find this beer"
                />
            ),
        };
    }, beers);
};

const memoMapBeerCard = memoizeWith(
    identity,
    mapBeerInfoCards
);

export default BeerInfoCard;
