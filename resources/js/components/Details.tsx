import React from 'react';
import { useEffect, useState } from 'react';

import apiConfiguration from './../settings.js';
import { useParams } from 'react-router-dom';
import { Book } from '@/models/book.js';
import { Review } from '@/models/review.js';

function Detail() {
    const { id } = useParams();
    const [book, setBook] = useState<Book>()

    const fetchData = async () => {
        try {
            let path = apiConfiguration.apiEndpoints.books.replace(":id", id.toString())
            const response = await fetch(path)
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            let data = await response.json();
            if (!data.reviews) data.reviews = [];
            setBook(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData();
    }, [book?.reviews.length]);

    return (
        <div className='mx-6'>
            Book # {id}
            <div className="relative flex flex-col mt-6 bg-white shadow-sm border border-slate-200 rounded-lg">
                <div className="p-4">
                    <h5>
                        Автор: {book?.author}
                    </h5>
                    <h4 className="mb-2 text-slate-800 text-xl font-semibold">
                        Название: {book?.title}
                    </h4>
                    <h6>
                        <span className='mr-5'>Год: {book?.year} </span><span>Жанр: {book?.genre}</span>
                    </h6>
                    <p className="text-slate-600 leading-normal font-light">
                        {book?.description}
                    </p>
                </div>
            </div>
            <div className="relative flex flex-col mt-6 bg-white shadow-sm border border-slate-200 rounded-lg">
                <div className="p-4">
                    <h5 className="mb-2 text-slate-800 text-base font-semibold">
                        Отзывы: {book?.reviews.length}
                        {(() => {
                            if (book?.reviews) {
                                return book.reviews.map((review) => (
                                    <div className="relative flex flex-col mt-2 bg-white shadow-sm border border-slate-200 rounded-lg">
                                        <div className="p-2">
                                            <h5 className="mb-2 text-slate-800 text-base font-semibold">
                                                Имя: {review.username}
                                            </h5>
                                            <h5 className="mb-2 text-slate-800 text-sm font-semibold">
                                                Рейтинг: {review.rating}
                                            </h5>
                                            <h5 className="mb-2 text-slate-800 text-sm font-semibold">
                                                Коментарий: {review.comment}
                                            </h5>

                                        </div>
                                    </div>
                                ))

                            }
                        }
                        )()
                        }
                    </h5>

                </div>
            </div>

        </div>
    );

}

export default Detail;