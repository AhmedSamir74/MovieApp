import APIKit from "../axios/axios";

class MoviesManager {
  async searchMovies(searchQuery: string, page: number = 1) {
    let url = `search/movie?query=${searchQuery}&&page=${page}`;
    let { data: response, statusText, status } = await APIKit.get(url);

    if (status == 200) {
      return {
        status: true,
        data: response.results,
        page: response.page,
        pages: response.total_pages,
      };
    } else {
      return { status: false, data: "Boom", page: 0, pages: 0 };
    }
  }

  async getMoviesList(listName: string, page: number = 1) {
    let url = `/movie/${listName}?page=${page}`;
    let { data: response, statusText, status } = await APIKit.get(url);

    if (status == 200) {
      return {
        status: true,
        data: response.results,
        page: response.page,
        pages: response.total_pages,
      };
    } else {
      return { status: false, data: "Boom", page: 0, pages: 0 };
    }
  }

  async getMovieDetails(id: number) {
    let { data: response, statusText, status } = await APIKit.get(
      `movie/${id}`
    );

    if (status == 200) {
      return {
        status: true,
        data: response,
      };
    } else {
      return { status: false, data: statusText };
    }
  }

  async getMovieCredits(id: number) {
    let { data: response, statusText, status } = await APIKit.get(
      `movie/${id}/credits`
    );

    if (status == 200) {
      return {
        status: true,
        data: response.cast,
      };
    } else {
      return { status: false, data: statusText };
    }
  }
}

export default MoviesManager;
