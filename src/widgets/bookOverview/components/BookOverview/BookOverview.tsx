import React from 'react';
import {Card, Text, UserLabel} from '@gravity-ui/uikit';
import {AuthorInfo, GenreInfo} from '@/entities/book';
import {Book} from '@/shared/api/book';
import {User} from '@/shared/api/user';
import {useReserveBookMutation, useCancelBookReservationMutation} from '@/shared/api/book';
import {AgeLimit, Rating} from '@/shared/components';
import {BookActions} from '@/features/bookActions';
import stubImage from '@/shared/assets/stub.jpg';

import block from 'bem-cn-lite';
import './BookOverview.scss';
const b = block('bookOverview');

export interface BookOverviewProps {
    book: Book;
    self?: boolean;
    userData?: User;
    refetch: () => void;
}

export const BookOverview: React.FC<BookOverviewProps> = ({
    book,
    self,
    userData,
    refetch,
}: BookOverviewProps) => {
    const {
        bookId,
        bookName,
        authorName,
        authorPhotoUrl,
        releaseYear,
        ageLimit,
        description,
        photoUrl,
        rating,
        status,
        genres,
    } = book;

    const [reserveBook] = useReserveBookMutation();
    const [cancelBookReservation] = useCancelBookReservationMutation();

    const handleReserve = async () => {
        await reserveBook({bookId: bookId.toString()});
        refetch();
    };

    const handleCancelReservation = async () => {
        await cancelBookReservation();
        refetch();
    };

    return (
        <Card view="filled">
            <div className={b()}>
                <div className={b('bookInfo')}>
                    <div className={b('bookName')}>
                        <Text variant="display-2">{bookName}</Text>
                        {rating > 0 && <Rating rating={rating} className={b('rate')} />}
                        <AgeLimit ageLimit={ageLimit} className={b('ageLimit')} />
                    </div>
                    <Text className={b('description')} variant="body-2">
                        {description}
                    </Text>
                    <div className={b('info')}>
                        <Text className={b('text')}>Жанр</Text>
                        {!!genres && genres.length > 0 && (
                            <GenreInfo genres={genres.map(({genreName}) => genreName)} />
                        )}
                        <Text className={b('text')}>Автор</Text>
                        <AuthorInfo authorName={authorName} authorImgSrc={authorPhotoUrl} />
                        <Text className={b('text')}>Год издания</Text>
                        <UserLabel type="empty" size={'m'} view="outlined">
                            {releaseYear}
                        </UserLabel>
                    </div>

                    <div className={b('rentBlock')}>
                        <BookActions
                            status={status}
                            handleReserve={handleReserve}
                            handleCancelReservation={handleCancelReservation}
                            self={self}
                            userData={userData}
                        />
                    </div>
                </div>
                <img className={b('bookImage')} src={photoUrl || stubImage} alt={bookName} />
            </div>
        </Card>
    );
};

export default BookOverview;
