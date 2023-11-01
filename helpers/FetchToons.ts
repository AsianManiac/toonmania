export async function fetchToon() {
  const headers = {
    "X-RapidAPI-Key": "ea0ce19172mshe0581dcd2bfc2f5p102f7ajsne20fc668ceb7",
    "X-RapidAPI-Host": "webtoon.p.rapidapi.com",
  };

  const response = await fetch(
    "https://webtoon.p.rapidapi.com/originals/titles/list?language=en",
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}
