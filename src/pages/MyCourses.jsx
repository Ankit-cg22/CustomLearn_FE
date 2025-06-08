import TopBar from "../components/TopBar";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "antd";
import { BookOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useCourseStore from "../store/courseStore";
import WeekContent from "../components/WeekContent";
import { useParams } from "react-router-dom";

function MyCourses() {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const { setCourseData, setCourseId, courseId, courseData } = useCourseStore((state) => state);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { courseId: paramCourseId } = useParams();

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
        setError("");
        axios
            .get(`http://127.0.0.1:8000/courses/coursesByEmail/${user.email}`)
            .then((res) => setCourses(res.data))
            .catch(() => setError("Failed to load courses."))
            .finally(() => setLoading(false));
    }, [user]);

    // Set courseId from URL param if present
    useEffect(() => {
        if (paramCourseId && paramCourseId !== courseId) {
            setCourseId(paramCourseId);
        }
    }, [paramCourseId, setCourseId, courseId]);

    // Fetch course data when courseId changes
    useEffect(() => {
        if (courseId) {
            axios
                .get(`http://127.0.0.1:8000/courses/courseById/${courseId}`)
                .then((res) => {
                    setCourseData(res.data);
                })
                .catch(() => {
                    console.error("Failed to load course details.");
                });
        }
    }, [courseId, setCourseData]);

    const handleCourseClick = (id) => {
        setCourseId(id);
        navigate(`/myCourses/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-white shadow flex flex-col justify-between">
                    <div className="overflow-y-auto">
                        <Menu
                            style={{ width: "100%" }}
                            items={[
                                ...courses.map((course) => ({
                                    key: course._id,
                                    label: course.course_name,
                                    icon: <BookOutlined />,
                                    onClick: () => handleCourseClick(course._id),
                                })),
                            ]}
                            selectedKeys={[courseId]}
                        />
                    </div>
                    <div className="p-4">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                            onClick={() => navigate("/")}
                        >
                            <PlusOutlined /> Create New Course
                        </button>
                    </div>
                </div>
                <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 inline-block overflow-auto" style ={{ maxHeight : "calc(100vh - 4rem)"}}>
                    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
                    <div className="w-full max-w-3xl inline-block">
                        {loading ? (
                            <div className="text-gray-500 text-lg">Loading...</div>
                        ) : error ? (
                            <div className="text-red-500 text-lg">{error}</div>
                        ) : courseId && courseData ? (
                            <>
                                <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
                                    {courseData?.course_name}
                                </h1>
                                {courseData?.roadmap?.map((week) => (
                                    <WeekContent key={week.week} weekIdx={week.week - 1} />
                                ))}
                            </>
                        ) : (
                            <div className="text-gray-500 text-lg">
                                Select a course from the sidebar to view details.
                            </div>
                        )}
                    </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MyCourses;
