import {useNavigate} from 'react-router-dom';
import {Button, Card, Spin, Text} from '@gravity-ui/uikit';
import {Carousel} from '@/shared/components/Carousel/Carousel';
import {useGetBookPageQuery} from '@/shared/api/book/api';
import {BookList} from '@/entities/book';

import libraryImage from '@/shared/assets/images/library.jpg';
import girlRead from '@/shared/assets/images/girl.jpeg';
import girl from '@/shared/assets/images/girlLibrary.jpg';
import block from 'bem-cn-lite';
import './Page.scss';
const b = block('mainPage');

export const Page = () => {
    const navigate = useNavigate();
    const {data, isLoading} = useGetBookPageQuery({page: 0});

    return (
        <div className={b()}>
            <div className={b('block')}>
                <img
                    src={libraryImage}
                    alt="Здание библиотеки"
                    className={b('image', {horizontal: true})}
                />
                <Text variant="body-3">
                    <Text variant="display-2">Наше уютное гнездышко для любителей книг</Text>
                    <br />
                    <br />
                    Добро пожаловать на сайт библиотеки "Литературное гнездо" — место, где каждая
                    книга становится историей, а каждая история находит своего читателя. Здесь стиль
                    и мода встречаются с вечной классикой, создавая пространство, в котором удобно и
                    уютно проводить время.
                    <br />
                    <br />
                    "Литературное гнездо" — ваш идеальный уголок для тишины и чтения. Каждый визит к
                    нам — это не просто путешествие в мир книг, это момент релаксации в обстановке,
                    напоминающей о домашнем тепле и уюте. Окунитесь в атмосферу доброжелательности и
                    покоя.
                    <br />
                    <br />
                    Почувствуйте настоящую гармонию в "Литературном гнезде" — месте, где книги и уют
                    неразделимы. Вас ждёт атмосфера комфорта и дружелюбия, способная превратить
                    чтение в незабываемый отдых.
                </Text>
            </div>

            <div className={b('imgBlock')}>
                <img
                    src={girl}
                    alt="Девушка в библиотеке"
                    className={b('image', {horizontal: true})}
                />
                <img src={girlRead} alt="Девушка читает" className={b('image', {vertical: true})} />
            </div>
            <Text variant="display-2">Концепция библиотеки "Литературное гнездышко"</Text>

            <Text variant="body-3">
                В "Литературном гнезде" вы найдете уютные кресла, мягкие пледы и теплый свет,
                который располагает к неспешному чтению и погружению в литературные миры. Атмосфера
                здесь диктует стиль, который нравится каждому посетителю — от заядлого книгомана до
                тех, кто просто ищет тихий уголок для отдыха.
                <br />
                <br />
                Одной из особенностей нашей библиотеки является возможность забронировать книгу и
                наслаждаться ею в комфорте собственного дома. Это просто: выберите понравившуюся
                книгу из нашего онлайн-каталога, забронируйте её, и она будет ждать вас для
                уединенного чтения дома. Такой подход дарит свободу и гибкость, позволяя вам
                назначать собственный ритм чтения.
                <br />
                <br />
                Однако настоящие любители книг знают, насколько приятно находиться среди книг,
                чувствовать запах бумаги и чернил. У нас вы можете ознакомиться с нашим обширным
                каталогом и прийти, чтобы читать прямо здесь, в сердце уютной библиотеки. Вам
                доступна наша читальная зона, где помимо удобных мест для чтения, часто проводятся
                литературные встречи, чайные посиделки и тематические вечера, которые делают
                "Литературное гнездо" не просто библиотекой, а культурным центром общения и обмена
                идеями. Кроме того, мы гордимся нашей разнообразной коллекцией книг. Будь то
                классическая литература, современные бестселлеры или редкие издания, тщательно
                отобранные с учетом интересов наших гостей — здесь каждый найдет что-то по душе.
            </Text>

            {isLoading ? (
                <Spin className="loader" />
            ) : (
                <Carousel itemCount={20}>
                    <BookList
                        className={b('bookList')}
                        books={data?.books ?? []}
                        onBookClick={(id) => navigate(`book/${id}`)}
                    />
                </Carousel>
            )}
        </div>
    );
};

export default Page;