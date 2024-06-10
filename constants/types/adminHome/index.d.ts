export interface productType{
    id: string,
    type: string,
    name: string,
    img: string,
    key: Number,
    imgKey: string
}

export interface overViewType{
    evaluationCount: number
    avgEvaluationScore: number,
    doneOrderCount: number,
    income: number,
}

export interface commentType{
    grade: number,
    speed: number,
    content: string,
    customer: string
}