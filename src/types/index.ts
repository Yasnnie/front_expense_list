export interface ExpenseType {
    id:number
    description: string
    date: string
    value: number
    category:string
}


export type ExpenseCreate = Omit<ExpenseType, "id">