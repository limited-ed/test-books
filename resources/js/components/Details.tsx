import React from 'react';
import { useEffect, useState } from 'react';

import apiConfiguration from './../settings.js';
import { useParams } from 'react-router-dom';
import { Book } from '@/models/book.js';
import { Review } from '@/models/review.js';



type ValidationError = {
    username?: string
    rating?: string
}

type ReviewForm = {
    username: string
    rating: number
    comment: string
}



function Detail() {
    const { id } = useParams();
    const [book, setBook] = useState<Book>({author:"", description:"", genre:"", id:0, reviews:[], title:"", year:0})
    const [loading, setLoading] = useState(true);
    const [buttonText, setSending]=useState(false);
    const [error, setError] = useState(false)
    const [validation, setValidation] = useState<ValidationError>({});
    const [review, setReview] = useState<ReviewForm>({ username: "", rating: 0, comment: "" })

    const fetchData = async (id: number) => {
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
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }


    const sendReview = async (sendReview: ReviewForm) => {
        try {
            let path = apiConfiguration.apiEndpoints.reviews.replace(":id", id.toString());
            const response = await fetch(path,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(sendReview)
                });
            if (!response.ok) {
                throw JSON.parse(await response.text());
            }
            let newReview=await response.json();
            setBook({...book, reviews:[...book.reviews, newReview]});
            setReview({comment:"", rating:0, username:""});
            setValidation({});
        }
        catch (error: any) {
            if (typeof(error.errors)==="undefined"){
                setError(true);
            }
            let ve:any={}
            for(var prop in error.errors){
                ve[prop]=error.errors[prop].join("");
            }
            setValidation(ve);
        }
        finally{

        }
    }

    const sendClick = () => {
        setError(false);
        sendReview(review);
    }

    useEffect(() => {
        if (id) {
            fetchData(Number(id));
        }        
    }, []);


    if (loading && !error) {
        return (
            <h5>Загрузка</h5>
        )
    }

    return (
        <div className='mx-6'>
            <div className={`p-2 text-sm text-white bg-red-800 ${!error ? "hidden" : "block"}`}> Ошибка сервера</div>
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

                        <details>
                            <summary>Отзывы: {book?.reviews.length}</summary>
                            {book?.reviews.map((review) => (
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
                            ))}
                        </details>
                        <div className="relative flex flex-col mt-6 bg-white shadow-sm border border-slate-200 rounded-lg pt-4 px-4">
                            <h5 className="mb-2 text-slate-800 text-base font-semibold">Оставить отзыв {validation.username}</h5>
                            <div>
                                <label htmlFor="username" className={`block mb-2 text-sm font-medium ${typeof (validation.username) != 'undefined' ? "text-red-700" : "text-sky-700"} `}>Введите имя (50 символов)</label>
                                <input type="text" id="username" value={review.username} className={` border block w-full p-2.5 text-sm rounded-lg
                                    ${typeof (validation.username) != 'undefined' ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500" : "bg-sky-50 border-sky-500 text-sky-900 placeholder-sky-300 focus:ring-sky-500 focus:border-sky-500"}`} placeholder="Имя пользователя"
                                    onChange={((event) => setReview({ ...review, username: event.target.value }))} />
                                <p className={`mt-2 text-sm text-red-600 dark:text-red-500" ${typeof (validation.username) === 'undefined' ? "invisible" : ""}`}> Ошибка: <span className="font-normal">{validation.username}</span></p>
                            </div>

                            <div>
                                <label htmlFor="rating" className={`block mb-2 text-sm font-medium ${typeof (validation.rating) != 'undefined' ? "text-red-700" : "text-sky-700"} `}>Введите рейтинг (1-5)</label>
                                <input type="number" id="rating" value={review.rating} className={` border block w-full p-2.5 text-sm rounded-lg
                                    ${typeof (validation.rating) != 'undefined' ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500" : "bg-sky-50 border-sky-500 text-sky-900 placeholder-sky-300 focus:ring-sky-500 focus:border-sky-500"}`} placeholder="Рейтинг"
                                    onChange={((event) => setReview({ ...review, rating: Number(event.target.value) }))} />

                                <p className={`mt-2 text-sm text-red-600 dark:text-red-500" ${typeof (validation.rating) === 'undefined' ? "invisible" : ""}`}> Ошибка: <span className="font-normal">{validation.rating}</span></p>
                            </div>

                            <div>
                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-sky-700">Введите имя (50 символов)</label>
                                <textarea id="comment" value={review.comment} className="border block w-full p-2.5 text-sm rounded-lg bg-sky-50 border-sky-500 text-sky-900 placeholder-sky-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Коментарий"
                                    onChange={((event) => setReview({ ...review, comment: event.target.value }))}  ></textarea>
                            </div>

                            <button  className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none my-3 w-50" type="button"
                                onClick={sendClick}>
                                Отправить отзыв
                            </button>
                        </div>
                    </h5>

                </div>
            </div>

        </div>
    );

}

export default Detail;