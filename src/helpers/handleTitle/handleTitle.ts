
const routeTitle : Record<string, string> = {
    "/" : "Home",
    "/login" : "Login",

    "/categories" : "List Categories",
    "/categories/create" : "Create Categories",
    "/categories/edit" : "Edit Categories",
    
    "/cast-members" : "List Cast Members",
    "/cast-members/create" : "Create Cast Members",
    "/cast-members/edit" : "Edit Cast Members",
    
    "/genres" : "List Genre",
    "/genres/create" : "Create Genre",
    "/genres/edit" : "Edit Genre",
    
    "/videos" : "List Video",
    "/videos/create" : "Create Video",
    "/videos/edit" : "Edit Video"
}

export function handleTitle(pagePath: string) : string {

    let title = routeTitle[pagePath];
        console.log(title);
    
    if(!title){
        if(pagePath.startsWith('/categories/edit/')){
            title = "Edit Category"
        } else if (pagePath.startsWith("/cast-members/edit")){
            title = 'Edit Cast Member'
        }
        else if(pagePath.startsWith('/categories/edit')){
            title = "Edit Category"
        } else if (pagePath.startsWith("/genres/edit")){
            title = 'Edit Genres'
        } else if (pagePath.startsWith("/videos/edit")){
            title = 'Edit videos'
        }
    }

    if(!title){
        title = 'News'
    }


    return title;
}