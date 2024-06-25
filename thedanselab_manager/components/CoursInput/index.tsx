"use client"
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

interface CoursInputProps {
  courseId: string;
  setCourseId: (courseId: string) => void;
  setCourseTitle: (courseTitle: string) => void;
}

const CoursInput: React.FC<CoursInputProps> = ({ courseId, setCourseId, setCourseTitle }) => {
  const [courses, setCourses] = useState<{ id: string, title: string }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = courses.find(course => course.id === e.target.value);
    if (selectedCourse) {
      setCourseId(selectedCourse.id);
      setCourseTitle(selectedCourse.title);
    }
  };

  return (
    <div>
      <label htmlFor="course" className="block text-sm font-medium text-gray-700">
        Cours
      </label>
      <select
        id="course"
        value={courseId}
        onChange={handleCourseChange}
        className="border-gray-300 rounded mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Sélectionnez un cours</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoursInput;
