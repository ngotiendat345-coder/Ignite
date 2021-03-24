interface Game{
    name:string
    released:string
    image:string
    id:number
}

type GamesState={
    popular:Game[]
    newGame:Game[]
    upComing:Game[]
    searched:Game[]
    error:string
}


interface IDetailGame{
    name:string
    image:string
    id:number
    rating:number
    descriptionRaw:string
    platforms:[]
}
// interface IPlatform{
//     name:string
//     id:number
// }
interface IScreen{
    id:number
    image:string
}

type DetailGameState={
    game:IDetailGame
    screen:IScreen[]
    isLoading:boolean
}

type DispatchType = (arg:ArticleAction)=>void