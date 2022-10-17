const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: "b5def9c950e46fe2cff5c089b475b656",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}


export default apiConfig;