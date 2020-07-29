1. 소개

2. bolier-plate , mongodb 연결
- 기본 껍데기 https://github.com/jaewonhimnae/boiler-plate-ko/
- 다운받고, npm install (root에서한번, client에서한번, 기존 프로젝트의 dependency를 받음)
- 내 github랑 연동 
(1) 내 github에 repository를 create
(2) local에서 root폴더에서 git init
(3) add & commit한뒤, git remote add origin [주소] , [주소]는 github repository 만들면 주소 나옴
(4) git push origin master 하고 연결 완료

3. The MovieDB API
- https://www.themoviedb.org/
- 가입후 api key생성
- 내 API key(v3 auth) :: fcaa5f038b59ab357e13da6a230b9650
- 내 API key읽기 액세스 토큰 (v4 aut) :: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2FhNWYwMzhiNTlhYjM1N2UxM2RhNmEyMzBiOTY1MCIsInN1YiI6IjVmMTdlMzNhNDI4NGVhMDAzNDM1NDMzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EChvBqHgLj03M9WcDS8JsMdSU99S_10S6EEDYO3Nubk
- 예시 :: https://api.themoviedb.org/3/movie/550?api_key=fcaa5f038b59ab357e13da6a230b9650
- api url :: https://api.themoviedb.org/3/  -> 상수로 설정
- api image url:: https://image.tmdb.org/


4. Landing Page 
(1) 전체 templete을 간단하게 만들기
(2) Movie API에서 가져온 모든 데이터를 STATE에 넣기
(3) MainImage Component를 만들기
(4) GridCardComponent 만들기 -> 5강
(5) LoadMoreFunction 만들기 -> 6강


5. Grid Card Component
- rfce 명령어를 입력하면 functional Component를 자동완성해줌
- extetions > es7 을 설치하면 됨
- antd -> Row 기능
- gutter :: space 여유를 주는 기능? 디자인같은데
- array를 loop
{Movies && Movies.map((movie,index) => (
    <React.Fragment key ={index}>
))}


6. LoadMoreFunction 
- click event and scroll function 

7.   moviedetail page 
- 무비API에서 가져온 정보를 State에 넣고
- Detail templete를 만들고
- 영화 ID에 해당하는 Crew Infomation을 가져온뒤 State에 넣고 
- State에 보관된 Data들을 화면에 보여주기


8. Toggle Actor View Function

9. Favorite Button Function
(1) Favorite Model 만들기 (userForm, movieId, movieTitle, movieIMage, movieRunTime)
(2) Favorite Button UI
(3) count Favorite 
(4) I, is Favorite
(5) show data to View




** 
기본 git repository를 가져오면 Error: Cannot find module 'bcrypt' 오류가 생길수있음
강사님 기준과 현재 버전이 안맞는듯, 
서버쪽 package.json에서  "bcrypt": "^5.0.0",으로 변경한뒤
npm install 재인스톨해주면됨