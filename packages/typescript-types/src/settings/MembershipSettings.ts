export interface MembershipSettings{
    allowUserToPost: boolean,
    membership: boolean,
    anyoneCanRegister: boolean,
    usersCanFollowEachOther: boolean,
    usersCanMessageEachOther: boolean,
    usersCanCommentOnThePosts: boolean,
    allowedPostTypeUserCanCreate:string[],
    usersPersonalEmailAddress: boolean,
    postByUserSettings:{
        [key:string]:any
    }[]
}