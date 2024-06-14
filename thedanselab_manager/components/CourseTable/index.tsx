// components/CourseTable.tsx
import React, { useEffect, useState } from "react";
import TableSkeleton from "../TableSkeleton/intex";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  duration: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  if (!courses) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Titre</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Prix</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Durée</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{course.title}</td>
              <td className="py-2 px-4 border-b">{course.description}</td>
              <td className="py-2 px-4 border-b">{course.price} €</td>
              <td className="py-2 px-4 border-b">{course.date}</td>
              <td className="py-2 px-4 border-b">{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
