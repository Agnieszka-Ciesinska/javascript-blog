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

//GENERATE TITLE LIST 

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  console.log();

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);

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

//***************************** Part III *********************************************************************************

function generateTags(){

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  
  /* START LOOP: for every article: */
  
  for(let article of articles){
  

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */

    let html = '';
  
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('.data-tags');
    console.log(articleTags);
  
    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
  
    /* START LOOP: for each tag */
  
    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';
      console.log(linkHTML);
  
      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);
  
      /* END LOOP: for each tag */
  
    }
    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);

  
  /* END LOOP: for every article: */
  }
}

/************************************* Part IV *********************************************************************** */

generateTags();

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

  const tagLinks = document.querySelectorAll.('a[href="' + href + '"]'); //querySelectorAll czy getAttribute?
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
  
/********************************** Part V ******************************************************************************* */

function addClickListenersToTags(){
  /* find all links to tags */
  
  /* START LOOP: for each link */
  
  /* add tagClickHandler as event listener for that link */
  
  /* END LOOP: for each link */
}
  
addClickListenersToTags();