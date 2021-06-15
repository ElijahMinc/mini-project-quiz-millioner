async function getQuestions() {
   const resp = await fetch('root/questions.json');
   const result = resp.json();
   return result;
}
export const questions = await getQuestions();
