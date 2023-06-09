'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  console.log('clickedElement:', targetArticle);
  targetArticle.classList.add('active');

}

/**************************************addEventListenerToTitleLinks - nowa funkcja *********************** */
function addEventListenerToTitleLinks(){
  const links = document.querySelectorAll('.titles a');
  //console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
//*********************************************************************************************************************************** */

//GENERATE TITLE LIST 

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
  console.log();

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(customSelector);
  //console.log(articles);

  for(let article of articles){
      
    /* get the article id */

    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /*const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; */
    //console.log(linkHTML);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    //console.log(html);
  }

  titleList.innerHTML = html;
  addEventListenerToTitleLinks();
}
generateTitleLinks();

/*const links = document.querySelectorAll('.titles a');
//console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/
//****************************************************FUNCTION CALCULATE TAGS PARAMS********************************************
function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 99999,
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;

}

//*****************************************************calculateTagClass***********************************************************

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

//*********************************************************************************************************************************/
/*GENERATE TAGS */

const optTagsListSelector = '.tags.list';

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log(tagsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      //console.log(tag);

      /* generate HTML of the link */

      const tagHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagsLink(tagHTMLData);

      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; */
      //console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      //console.log(html);

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags.hasOwnProperty(tag)){

        /* [NEW] add tag to allTags object */

        allTags[tag]= 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);

  /* [NEW] create variable for all links HTML code */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* let allTagsHTML = ''; */
  const allTagsData = {tags: []};




  /* [NEW] START LOOP: for each tag in allTags */

  for(let tag in allTags){
  /*[NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' (' + allTags[tag] + ') '; - wyświetla jedynie nazwę tagu oraz liczbę jego wystąpień */
    //allTagsHTML += '<li><a href="#tag-' + tag + ' ('+ allTags[tag] + ')</a></li>'; - tak myślałam żeby zrobić aby wygenerować link html.
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + ' (' + allTags[tag] + ')</a></li>';
    /* allTagsHTML += tagLinkHTML; */

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });




    /*[NEW] END LOOP: for each tag in allTags */

  }

  /*[NEW] add html from allTagsHTML to tagList */

  /* tagList.innerHTML = allTagsHTML; */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);




}

generateTags();
//******************************************************************************************************************************
//TAG CLICK HANDLER

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  //console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  //console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  //console.log(tag);

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(activeTags);

  /* START LOOP: for each active tag link */

  for(let activeTag of activeTags){
    //console.log(activeTag);

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]'); //querySelectorAll czy getAttribute?
  //console.log(tagLinks);

  /* START LOOP: for each found tag link */

  for(let tagLink of tagLinks){
    //console.log(tagLink);

    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

//***********************************************************************************************************************************/
//CLICK LISTENERS TO TAGS

function addClickListenersToTags(){
  /* find all links to tags */

  let href = '#tag-';
  const allTagLinks = document.querySelectorAll('a[href^="' + href + '"]');
  //console.log(allTagLinks);

  /* START LOOP: for each link */

  for(let link of allTagLinks){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }

}

addClickListenersToTags();

//********************************************************************************************************************************

const optArticleAuthorSelector = '.post-author';
const optAuthorsListSelector = '.authors.list';

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */

  let allAuthors ={};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    //console.log(article);

    /* find author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
  
    /* make html variable with empty string */

    let html = '';

    /* get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    //console.log(author);

    /* insert HTML of all the links into the author wrapper */

    const authorHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleLink(authorHTMLData);

    /* const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>'; */

    /*add generated code to html variable */

    html = linkHTML;

    /* [NEW] check if this link is not altready in allAuthors */

    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /*  */

    /*insert HTML of all the links into the author wrapper */

    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] ffind list of authors in right column */

  const authorsList = document.querySelector(optAuthorsListSelector);
  console.log(authorsList);

  /*[NEW] create variable for all links HTML code */
  
  /* let allAuthorsHTML = ''; */
  const allAuthorsData = {authors: []};





  /* [NEW]  START LOOP: for each author in allAuthors */
  for(let author in allAuthors){

    /* allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li>';
    console.log(allAuthorsHTML); */

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });






    /* [NEW] END LOOP: for each author in allAuthors */
  
  }

  /* authorsList.innerHTML = allAuthorsHTML; */ authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);







}

generateAuthors();

//************************************************************************************************** */

function authorClickHandler(event){

  /* prevent default action for this event */
  
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  
  const clickedElement = this;
  //console.log(clickedElement);
  
  /*  make a new constant "href" and read the attribute "href" of the clicked element */
  
  const href = clickedElement.getAttribute('href');
  //console.log(href);
   
  /*  make a new constant "author" and extract author from the "href" constant */
  
  const author = href.replace('#author-', '');
  //console.log(author);
  
  /* find all author links with class active */
  
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log(activeAuthorLinks);
  
  /* START LOOP: for each active author link */
  
  for (let activeAuthorLink of activeAuthorLinks) {
    //console.log(activeAuthorLink);
  
    /* remove class active */
  
    activeAuthorLink.classList.remove('active');
  
    /* END LOOP: for each active tag link */
  
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(authorLinks);
  
  /* START LOOP: for each found tag link */
  
  for (let authorLink of authorLinks) {
    //console.log(authorLink);
  
    /* add class active */
  
    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  
  }
  
  /* execute function "generateTitleLinks" with article selector as argument */
  
  generateTitleLinks('[data-author="' + author + '"]');
  
}

//-------------------------------------------------------------------------------------------------------

function addClickListenersToAuthors(){

  /* find all links to tags */
  const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
  
  /* START LOOP: for each link */
  for (let authorsLink of allAuthorsLinks) {

    /* add event listener to every authorsLink */
    authorsLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();