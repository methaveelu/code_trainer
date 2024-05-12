export const paths = {
    home(){
        return '/';
    },
    //e.g. list out all questions in 1 topic e.g. javascript
    topicShow(slug: string){
        return `/topics/${slug}`;
    },
    //create question route for creating a new question
    questionCreate(slug: string){
        return `/topics/${slug}/questions/new`
    },
    //show ide and answer questions
    questionShow(slug: string, questionInfoId: string){
        return `/topics/${slug}/questions/${questionInfoId}`;
    },
    //create comment for question
    postCreate(slug: string, questionInfoId: string){
        return `/topics/${slug}/questions/${questionInfoId}/comments/new`;

    },
    //show comments for question
    postShow(slug: string, questionInfoId: string){
        return `/topics/${slug}/questions/${questionInfoId}/comments`;
    },
}