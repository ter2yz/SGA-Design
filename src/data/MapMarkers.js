const query = `
    {
        mapMarkersCollection {
            items {
                sys {
                    id
                }
                label
                latitude
                longitude
                image {
                    url
                }
                description
            }
        }
    }
    `

export const fetchMarkersJSON = async () => {
    const response = await fetch('https://graphql.contentful.com/content/v1/spaces/jszixocm2sp2/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API}`,
        },
        body: JSON.stringify({ query })
    })
    const markers = await response.json();
    return markers
}
