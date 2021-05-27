import fetch from 'isomorphic-unfetch';
import { GRAPHQL_HOST } from '../config.js';

async function fetchWithGraphql(query) {
    const resp = await fetch(GRAPHQL_HOST, {
        "headers": {
          "accept": "*/*",
          "sec-fetch-mode": "cors",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "cookie": "_mkto_trk=id:702-MYH-396&token:_mch-mozu.com-1620755600426-98089; mzrt-prod=Token=31bf5758c7484014be109e4ab6aaec63&Expires=637878884413349045&Expiration=637564388413310000&User=VqNm6WppN7Nj63xN06g2Folw%2FcI6HKgLad4fUI36Hn6Z4qcaUorCyOYauVJBaGvMPTXthuUnsGkLerhrwp4CZT9KL1UrKVDv33WX8HdkOktPvU9g4XOAto0NGv4kIUwo8rPFcaGYFjVgGWlhEHs%2BhKoWd5RZ39kmgudU8KkigZU%3D; _ga=GA1.2.156098541.1620755648; _gid=GA1.2.1418915866.1620755648; __utma=42390841.156098541.1620755648.1620755652.1620755652.1; __utmc=42390841; __utmz=42390841.1620755652.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmb=42390841.1.10.1620755652; sb-sf-at-prod-s=at=KZiXk%2FLrhHXsTGeWScyBQL1M6NIh0gfUl71r786klcH%2Bx0teq2Y35hgrg7pXilpj9X5IA6uSSJP%2Btqt8J4QYN88eeIfOem9ZYcR3WWI20R%2FKWUbUBtWDPZqXaTiSBHPSatsG3YT2z6bcUDrLTXu0PZpn8ibOpwLJduegjHcm2tEj%2Fr64QISTPI2EoHyDGX8vBAokZWlGHZbParJ9WyvDfVDmgKKBPl5P8RYGONUxcW%2BHIrUs79GJS6p0BfNtR1OM4kqYH%2BmtmYsuRGe%2F3E8i7CKK5vfKDM9ZfZw62N7SgnWA8XM4%2BCpcDqeeTyatYzdXFWlIU7FIlur68bZ39CRelA%3D%3D&dt=2021-05-11T17%3A54%3A15.0707898Z; sb-sf-at-prod=at=KZiXk%2FLrhHXsTGeWScyBQL1M6NIh0gfUl71r786klcH%2Bx0teq2Y35hgrg7pXilpj9X5IA6uSSJP%2Btqt8J4QYN88eeIfOem9ZYcR3WWI20R%2FKWUbUBtWDPZqXaTiSBHPSatsG3YT2z6bcUDrLTXu0PZpn8ibOpwLJduegjHcm2tEj%2Fr64QISTPI2EoHyDGX8vBAokZWlGHZbParJ9WyvDfVDmgKKBPl5P8RYGONUxcW%2BHIrUs79GJS6p0BfNtR1OM4kqYH%2BmtmYsuRGe%2F3E8i7CKK5vfKDM9ZfZw62N7SgnWA8XM4%2BCpcDqeeTyatYzdXFWlIU7FIlur68bZ39CRelA%3D%3D; _mzvr=Vg5onblNb0iFy4zq8ATj5w; _mzvs=nn; mozucartcount=%7B%22514fa29addd646bc827dd5c03fda8356%22%3A0%7D; _mzvt=VLhzaE7FDE21nsLIG3Yjnw; _mzPc=eyJjb3JyZWxhdGlvbklkIjoiZmVlOTU2MDZiZWEzNGQxODlhZDZlYjdlYjUxMTA1ZmIiLCJpcEFkZHJlc3MiOiI2Ny4xOTguOTYuMzEiLCJpc0RlYnVnTW9kZSI6ZmFsc2UsImlzQ3Jhd2xlciI6ZmFsc2UsImlzTW9iaWxlIjpmYWxzZSwiaXNUYWJsZXQiOmZhbHNlLCJpc0Rlc2t0b3AiOnRydWUsInZpc2l0Ijp7InZpc2l0SWQiOiJWTGh6YUU3RkRFMjFuc0xJRzNZam53IiwidmlzaXRvcklkIjoiVmc1b25ibE5iMGlGeTR6cThBVGo1dyIsImlzVHJhY2tlZCI6ZmFsc2UsImlzVXNlclRyYWNrZWQiOmZhbHNlfSwidXNlciI6eyJpc0F1dGhlbnRpY2F0ZWQiOmZhbHNlLCJ1c2VySWQiOiI1MTRmYTI5YWRkZDY0NmJjODI3ZGQ1YzAzZmRhODM1NiIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwiZW1haWwiOiIiLCJpc0Fub255bW91cyI6dHJ1ZSwiYmVoYXZpb3JzIjpbMTAxNF0sImlzU2FsZXNSZXAiOmZhbHNlfSwidXNlclByb2ZpbGUiOnsidXNlcklkIjoiNTE0ZmEyOWFkZGQ2NDZiYzgyN2RkNWMwM2ZkYTgzNTYiLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImVtYWlsQWRkcmVzcyI6IiIsInVzZXJOYW1lIjoiIn0sImlzRWRpdE1vZGUiOmZhbHNlLCJpc0FkbWluTW9kZSI6ZmFsc2UsIm5vdyI6IjIwMjEtMDUtMTFUMTg6MTM6MTcuMzQ4MzYyOFoiLCJjcmF3bGVySW5mbyI6eyJpc0NyYXdsZXIiOmZhbHNlfSwiY3VycmVuY3lSYXRlSW5mbyI6e319"
        },
        "body": JSON.stringify(query),
        "method": "POST",
        "mode": 'cors'
      });
      return resp.json();
}

export default fetchWithGraphql