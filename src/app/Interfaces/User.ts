export interface User {
    "id"?: number,
    "email": string,
    "roles": string[],
    "asset": {
        "govtIdLocation"?: string,
        "resumeLocation"?: string,
        "profileImgLocation"?:string
    },
    "personal": {
        "email"?: string,
        "firstName"?: string,
        "lastName"?: string,
        "location": {
            "addressLine1"?: string,
            "addressLine2"?: string,
            "city"?: string,
            "country"?: string,
            "state"?: string,
            "zipcode"?: string
        },
        "phoneNumber"?: string
    },
    "professional": {
        "company"?: string,
        "primarySkill"?: string,
        "secondarySkill"?: string[],
        "linkedinUrl"?: string,
        "experience"?: number,
        "targetAnnualIncome"?: string,
        "workAuthorizationStatus"?: string,
        "workLocationPreference"?: string[],
        "willingToRelocate"?:string
    }
}