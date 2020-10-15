# Job Finder

* [Why this?](#why-this)  
* [What is this?](#what-is-this)
* [How do we do this?](#how-do-we-do-this)
    * [Feature plan](#feature-plan)  
* [How to test this?](#how-to-test-this)  
    * [Prerequisites](#prerequisites)  
    * [Install and run](#install-and-run)
* [Any questions or suggestions?](#any-questions-or-suggestions)  
* [You're looking for a nice co-worker like me?](#youre-looking-for-a-nice-co-worker-like-me)  

# Why this?

I have experienced job seeking to sometimes be a pain to do the right way. I have also met many other people that felt the same. Wouldn't it be nice to always sit back with satisfaction, when posting a resume and an application to a potential employer? So I asked myself: Can I make this easier? Then I started to write down all the different things I did manually to get from A to B and concluded that with my skills as a programmer and as unemployed: I could.

Another motivation is the COVID-19 that now in 2020 is targeting the world. The world is standing still. The job opportunities are few. I didn't want to stand still. So I made this project a studying project also. The goal is to also challenge myself in areas that are needed at the job market in the future. Finally I need to show it to the world, so the world knows for sure that I am becoming a stronger developer every day while many others are standing still. Therefore this Github repository where you can see all my new skills in play.
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

# What is this?

A web application that helps a job seeker create some of the important documents one need to get a job: A well targeted resume and job application.  
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

# How do we do this?

The development process will be agile to some extent and as such features from the backlog will be public to test in an amount that does not immediately make a full application, but gives one a quick peak into what is done. Bugs will exist, but the plan is to at least release something that is not just an error message. 
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

## Feature plan

- [ ] Applicant login
- [ ] Admin: Job postings
- [ ] Admin: Job experiences
    - [ ] Gained skills
    - [ ] Achieved results
- [ ] Admin: Skills
- [ ] Admin: Resumes and applications
    - [ ] Styling
    - [ ] Content types
    - [ ] Templating
    - [ ] Content managing
        - [ ] Analysis: Helps finding the right words and the rights skills for the application and the resume.
    - [ ] PDF export  

[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

# How to test this?

The file \docker-compose.yml is the easy key to get you started, if you know about Docker Compose. Otherwise read on.

The following instructions will only get you started with trying out the web app in your own private space. I will later add information on how to deploy it to your own public host. But as it is it should be completely usable for a single user.  
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

## Prerequisites

The simple things you need to install are:

- Git: To download the source code to build the web app from.
- Docker and Docker Compose: To get a virtual host up an running with the web app.
- A major web browser like Google Chrome, Mozilla Firefox og Microsoft Edge: These are simply used to access the web app on the virtual host.  

[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  


## Install and run

Follow these instructions to install Git:  
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Follow these instructions to install Docker:  
https://docs.docker.com/get-docker/

Follow these instructions to install Docker Compose:  
https://docs.docker.com/compose/install/

Next you need to create a folder somewhere on your hard drive where you want the web app to feel as home. A suggestion would be to create a folder called "job-finder" in your user folder. Then use this command in a terminal/command line to enter the new folder. For Windows make sure that you have admin privileges:   
```
cd [the absolute path to the folder you created]
```
Next use this command to download the web app to the folder. Do not forget the punctuation mark at the end of the line:
```
git clone https://github.com/a-creative/Job-Finder.git .
```
Next use these two commands to start up the virtual host and initialize the database:
```
docker-compose up -d
docker-compose exec backend php artisan doctrine:migrations:migrate 
```
Finally you open up your favorite web browser and go to the address:
```
http://localhost/:5001
```
At this point in time you should be up and running with the web app Job Finder in your browser.  
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

# Any questions or suggestions?

Feel free to contact me on [Facebook](https://www.facebook.com/maya.kathrine.andersen) or [email](mailto:m.andersen.post@gmail.com).
[<div style="text-align: right">⇧ Back</div>](#job-finder)
&nbsp;  

# You're looking for a nice co-worker like me?

Then also feel free to contact me about that - if you like what you have seen on this page. I am available for a full time position in the area of Aarhus, Denmark.

I would love to meet over a cup of coffee and talk about a possible professional future together. 

❤️

Maya Kathrine Andersen
&nbsp;  
&nbsp;  
![Profile image](./README/profile_250.jpg)
[<div style="text-align: right">⇧ Back</div>](#job-finder)