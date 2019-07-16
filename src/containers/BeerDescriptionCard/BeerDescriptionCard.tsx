import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Fade } from '@material-ui/core';
import { map } from 'ramda';

import { Query, GET_BEER_INFO } from '../../graphql';
import {
    DescriptionCard,
    AvailabilityCard,
    CommentCard,
} from '../../components';
import {
    beer,
    suggestChange,
    beer_beer_beerComments,
} from '../../@types';
import { GuaranteedQueryResult } from '../../@types/CustomGqlTypes';
import { SortingLink } from '../../components/ui/AvailabilityCard/AvailabilityCard';
import { SuggestChange } from '../../forms/SuggestChange';
import { VerticalFlexBoxWithMargin } from '../../commonStyles';
import { CommentsBox } from '../../components/ui/CommentsBox/CommentsBox';
import { LeaveRating } from '../LeaveRating';
import { LeaveBeerComment } from '../LeaveBeerComment';
import { DescriptionChildrenWrapper, DescriptionCardContainer } from '../common';

import { SUGGEST_BEER_CHANGE_QUERY } from './graphql';

export interface BeerDescriptionCardProps extends RouteComponentProps {
    beerId: string;
}
export const BeerDescriptionCard = ({
    beerId,
    history,
    ...other
}: BeerDescriptionCardProps) => {
    const [selected, setSelected] = useState(0);
    const [beerEditMode, setBeerEditMode] = useState(false);

    const handleSetBeerEditMode = useCallback(
        () => setBeerEditMode(editMode => !editMode),
        []
    );
    const handleSorting = useCallback(
        () => setSelected(s => (s === 0 ? 1 : 0)),
        []
    );
    const handleShowAllBars = useCallback(
        () => history.push(`/form/beers/${beerId}`),
        []
    );

    const sortingLinks: SortingLink[] = [
        { name: 'Cost', handler: handleSorting, selected: selected === 0 },
        { name: 'Distance', handler: handleSorting, selected: selected === 1 },
    ];

    return (
        <Query query={GET_BEER_INFO} variables={{ beerId }}>
            {({ data }: GuaranteedQueryResult<beer>) => (
                <DescriptionCardContainer>
                    <Fade in={!beerEditMode}>
                        {!beerEditMode ? (
                            <DescriptionChildrenWrapper>
                                <DescriptionCard
                                    onChangeSuggest={handleSetBeerEditMode}
                                    beer={data.beer}
                                    ratingComponent={
                                        <LeaveRating isBeer id={data.beer.id} />
                                    }
                                    {...other}
                                />
                            </DescriptionChildrenWrapper>
                        ) : (
                            <div />
                        )}
                    </Fade>
                    <Fade in={beerEditMode}>
                        {beerEditMode ? (
                            <Query query={SUGGEST_BEER_CHANGE_QUERY}>
                                {({
                                    data: {
                                        beerTypes: beerTypesData,
                                        breweries,
                                    },
                                }: GuaranteedQueryResult<suggestChange>) => (
                                    <DescriptionChildrenWrapper>
                                        <SuggestChange
                                            beerTypes={beerTypesData}
                                            breweries={breweries}
                                            beer={data.beer}
                                            onClear={handleSetBeerEditMode}
                                            {...other}
                                        />
                                    </DescriptionChildrenWrapper>
                                )}
                            </Query>
                        ) : (
                            <div />
                        )}
                    </Fade>
                    <VerticalFlexBoxWithMargin>
                        <AvailabilityCard
                            carouselHeader={`${data.beer.name} in bars`}
                            buttonClick={handleShowAllBars}
                            sortingLinks={sortingLinks}
                        />
                        <CommentsBox>
                            <LeaveBeerComment id={data.beer.id} />
                            {data.beer.beerComments 
                            ? map<
                                beer_beer_beerComments,
                                JSX.Element
                            >(({ user, comment }) => (
                                <CommentCard
                                    author={user ? user.nickname : 'Guest'}
                                    comment={comment}
                                />
                            ))(data.beer.beerComments)
                            : <span>{`Be the first to leave a comment about ${data.beer.name}`}</span>
                        }
                        </CommentsBox>
                    </VerticalFlexBoxWithMargin>
                </DescriptionCardContainer>
            )}
        </Query>
    );
};

export default BeerDescriptionCard;
