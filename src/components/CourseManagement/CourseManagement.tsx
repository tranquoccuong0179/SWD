import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Trash2, BookOpen } from 'lucide-react';

const CourseManagement = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Physics 101', price: '50 USD' },
        { id: 2, name: 'Physics 102', price: '70 USD' }
    ]);

    const [chapters, setChapters] = useState([
        { id: 1, courseId: 1, name: 'Chapter 1: Mechanics', order: 1 },
        { id: 2, courseId: 1, name: 'Chapter 2: Thermodynamics', order: 2 }
    ]);

    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
    const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const [courseForm, setCourseForm] = useState({ name: '', price: '' });
    const [chapterForm, setChapterForm] = useState({ courseId: '', name: '', order: 1 });

    const handleAddCourse = () => {
        const newCourse = {
            id: courses.length + 1,
            ...courseForm
        };
        setCourses([...courses, newCourse]);
        setIsAddCourseOpen(false);
        setCourseForm({ name: '', price: '' });
    };

    const handleUpdateCourse = () => {
        const updatedCourses = courses.map(course =>
            course.id === selectedCourse.id ? { ...course, ...courseForm } : course
        );
        setCourses(updatedCourses);
        setIsAddCourseOpen(false);
        setSelectedCourse(null);
        setCourseForm({ name: '', price: '' });
    };

    const handleDeleteCourse = (courseId) => {
        setCourses(courses.filter(course => course.id !== courseId));
        setChapters(chapters.filter(chapter => chapter.courseId !== courseId));
    };

    const handleAddChapter = () => {
        const newChapter = {
            id: chapters.length + 1,
            ...chapterForm,
            courseId: parseInt(chapterForm.courseId)
        };
        setChapters([...chapters, newChapter]);
        setIsAddChapterOpen(false);
        setChapterForm({ courseId: '', name: '', order: 1 });
    };

    const handleUpdateChapter = () => {
        const updatedChapters = chapters.map(chapter =>
            chapter.id === selectedChapter.id ? { ...chapter, ...chapterForm } : chapter
        );
        setChapters(updatedChapters);
        setIsAddChapterOpen(false);
        setSelectedChapter(null);
        setChapterForm({ courseId: '', name: '', order: 1 });
    };

    const handleDeleteChapter = (chapterId) => {
        setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    };

    return (
        <div className="p-6">
            <Tabs defaultValue="courses" className="w-full">
                <TabsList>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="chapters">Chapters</TabsTrigger>
                </TabsList>

                <TabsContent value="courses">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Course Management</CardTitle>
                            <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Course
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Course Name</Label>
                                            <Input
                                                id="name"
                                                value={courseForm.name}
                                                onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                id="price"
                                                value={courseForm.price}
                                                onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={selectedCourse ? handleUpdateCourse : handleAddCourse}>
                                            {selectedCourse ? 'Update' : 'Add'} Course
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell>{course.name}</TableCell>
                                            <TableCell>{course.price}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedCourse(course);
                                                            setCourseForm(course);
                                                            setIsAddCourseOpen(true);
                                                        }}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => handleDeleteCourse(course.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="chapters">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Chapter Management</CardTitle>
                            <Dialog open={isAddChapterOpen} onOpenChange={setIsAddChapterOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Add Chapter
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{selectedChapter ? 'Edit Chapter' : 'Add New Chapter'}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="courseId">Course</Label>
                                            <Select
                                                value={chapterForm.courseId.toString()}
                                                onValueChange={(value) => setChapterForm({ ...chapterForm, courseId: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courses.map((course) => (
                                                        <SelectItem key={course.id} value={course.id.toString()}>
                                                            {course.name} ({course.price})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Chapter Name</Label>
                                            <Input
                                                id="name"
                                                value={chapterForm.name}
                                                onChange={(e) => setChapterForm({ ...chapterForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="order">Order</Label>
                                            <Input
                                                id="order"
                                                type="number"
                                                value={chapterForm.order}
                                                onChange={(e) => setChapterForm({ ...chapterForm, order: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={selectedChapter ? handleUpdateChapter : handleAddChapter}>
                                            {selectedChapter ? 'Update' : 'Add'} Chapter
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Chapter</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {chapters.map((chapter) => {
                                        const course = courses.find((c) => c.id === chapter.courseId);
                                        return (
                                            <TableRow key={chapter.id}>
                                                <TableCell>{course ? `${course.name} (${course.price})` : 'Unknown Course'}</TableCell>
                                                <TableCell>{chapter.name}</TableCell>
                                                <TableCell>{chapter.order}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedChapter(chapter);
                                                                setChapterForm({
                                                                    courseId: chapter.courseId.toString(),
                                                                    name: chapter.name,
                                                                    order: chapter.order,
                                                                });
                                                                setIsAddChapterOpen(true);
                                                            }}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => handleDeleteChapter(chapter.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CourseManagement;
