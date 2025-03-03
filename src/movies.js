// Iteration 1: Get all directors
function getAllDirectors(movies) {
  return movies.map(movie => movie.director);
}

// Bonus 1.1: Remove duplicate directors
function getUniqueDirectors(movies) {
  return [...new Set(getAllDirectors(movies))];
}

// Iteration 2: Count Spielberg Drama Movies
function howManyMovies(movies) {
  return movies.filter(movie => 
    movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: Get Average Score of All Movies (rounded to 2 decimals)
function scoresAverage(movies) {
  if (movies.length === 0) return 0;

  const totalScore = movies.reduce((sum, movie) => sum + (movie.score || 0), 0);
  return parseFloat((totalScore / movies.length).toFixed(2));
}

// Iteration 4: Get Average Score of Drama Movies
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.includes("Drama"));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Order Movies by Year (ascending) & Alphabetical Order for Same Year
function orderByYear(movies) {
  return [...movies].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Get First 20 Movie Titles in Alphabetical Order
function orderAlphabetically(movies) {
  return movies.map(movie => movie.title).sort().slice(0, 20);
}

// Bonus Iteration 7: Convert Duration to Minutes
function turnHoursToMinutes(movies) {
  return movies.map(movie => {
    const duration = movie.duration;
    const hours = duration.includes("h") ? parseInt(duration.split("h")[0]) * 60 : 0;
    const minutes = duration.includes("min") ? parseInt(duration.split(" ")[1]) : 0;
    
    return { ...movie, duration: hours + minutes };
  });
}

// Bonus Iteration 8: Best Yearly Average Score
function bestYearAvg(movies) {
  if (movies.length === 0) return null;

  const yearScores = movies.reduce((acc, movie) => {
    if (!acc[movie.year]) acc[movie.year] = [];
    acc[movie.year].push(movie.score);
    return acc;
  }, {});

  let bestYear = null;
  let bestAvg = 0;

  for (const year in yearScores) {
    const avg = scoresAverage(yearScores[year].map(score => ({ score })));
    if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
      bestYear = year;
      bestAvg = avg;
    }
  }

  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}
