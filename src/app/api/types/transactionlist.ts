export interface TranscationList {
    success: boolean,
    data: {
        Amount: number,
        senderBank: string,
        companyAccount: string,
        utrNumber: string,
        transactionDateTime: string,
        recipient: string,
        status: string,
        userId: string,
        receiptNumber: string,
        _id: string,
        __v: number
    },
    message: string
}
export interface TranscationFetchList {
    success: boolean,
    data: [
        {
        Amount: number,
        senderBank: string,
        companyAccount: string,
        utrNumber: string,
        transactionDateTime: string,
        recipient: string,
        status: string,
        userId: string,
        receiptNumber: string,
        _id: string,
        __v: number
        },
    ]
    message: string
}

export type TranscationListResponse = TranscationList;
export type TranscationFetchResponse = TranscationFetchList;
