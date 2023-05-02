'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

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

//*********************************************************************************************************************************** */

//GENERATE TITLE LIST 

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){
  console.log();

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  console.log(articles);

  for(let article of articles){
      
    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

//*********************************************************************************************************************************/
/*GENERATE TAGS */

function generateTags(){

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /*nie skasowałam problematycznej zmiennej, a mniej więcej w tym momencie zniknęła mi znowu lewa kolumna strony*/

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

}

generateTags();
//******************************************************************************************************************************
//TAG CLICK HANDLER

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */

  for(let activeTag of activeTags){
    console.log(activeTag);

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]'); //querySelectorAll czy getAttribute?
  console.log(tagLinks);

  /* START LOOP: for each found tag link */

  for(let tagLink of tagLinks){
    console.log(tagLink);

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
  console.log(allTagLinks);

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

function generateAuthors(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    console.log(article);

    /* find author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
  
    /* make html variable with empty string */

    let html = '';

    /* get author from data-author attribute */

    const author = article.getAttribute('data-author');

    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>';

    /*add generated code to html variable */

    html = linkHTML;

    /*insert HTML into author wrapper */

    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

}

generateAuthors();

//************************************************************************************************** */

function authorClickHandler(event){

  /* prevent default action for this event */
  
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  
  const clickedElement = this;
  console.log(clickedElement);
  
  /*  make a new constant "href" and read the attribute "href" of the clicked element */
  
  const href = clickedElement.getAttribute('href');
  console.log(href);
   
  /*  make a new constant "author" and extract author from the "href" constant */
  
  const author = author.replace('#author-', '');
  console.log(author);
  
  /* find all author links with class active */
  
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);
  
  /* START LOOP: for each active author link */
  
  for (let activeAuthorLink of activeAuthorLinks) {
    console.log(activeAuthorLink);
  
    /* remove class active */
  
    activeAuthorLink.classList.remove('active');
  
    /* END LOOP: for each active tag link */
  
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);
  
  /* START LOOP: for each found tag link */
  
  for (let authorLink of authorLinks) {
    console.log(authorLink);
  
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

//**************************************************************************************************
