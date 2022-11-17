
export function getUrl(){
  if (process.env.NODE_ENV === "development"){
    return "http://localhost:4000";
  } else {
    return "https://gallery-example.herokuapp.com";
  }
}
