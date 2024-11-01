import { API } from "./api";


export const subjectService = {
    getSubject(page: number, size: number, id: string, search: string) {
        return API.get("/subjects", {
            params: {
                index: page,
                pageSize: size,
                id: id,
                nameSearch: search
            }
        });
    },
    getSubjectId(id: string) {
        return API.get(`/subjects/${id}`);
    }
}