import React from 'react';
import {Book} from '@/models/book.js'
import { NavLink } from 'react-router-dom';

type TableProps = {
    books: Book[]
}

const Table = (props:TableProps) => {
  return (
<div className="w-full">
  <div className="shadow overflow-hidden rounded border-b border-gray-200">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
        <th className="w-1/4 text-left py-3 px-4">Название</th>
        <th className="w-1/4 text-left py-3 px-4">Автор</th>
        <th className="w-1/6 text-left py-3 px-4">Год</th>
        <th className="w-1/4 text-left py-3 px-4">Жанр</th>
        <th className="text-left py-3 px-4">Описание</th>
        <th className="text-left py-3 px-4">Подробнее</th>
        </tr>
      </thead>
    <tbody className="text-gray-700">
{   
props.books.map((book: Book, index) => (
      <tr key={index} className="bg-gray-100">
        <td className="w-1/4 text-left py-3 px-4">{book.title}</td>
        <td className="w-1/4 text-left py-3 px-4">{book.author}</td>
        <td className="w-1/6 text-left py-3 px-4">{book.year}</td>
        <td className="w-1/4 text-left py-3 px-4">{book.genre}</td>
        <td className="text-left py-3 px-4">{book.description}</td>
        <td className="text-left py-3 px-4"><NavLink to={"/book/"+book.id}>Подробнее</NavLink> </td>
      </tr>
    ))
}

     
    </tbody>
    </table>
  </div>
</div>
  );
};

export default Table;