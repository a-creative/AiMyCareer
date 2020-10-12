# Job Finder

A web application that helps you in creating the documents you need to get a job: A well targetted resume and application. It involves the job postings you have interest in, your previous job experiences and the testimonials and skills related to these. That is the base idea.

# Motivation

As many other people experiencing unemployment I have experienced it to some times be a pain to do it right and to end up with the feeling of satisfaction when posting it to a potential employer. So I asked myself: Can I make this easier? I started to write down all the different things I did manually to get from A to B and concluded that with my skills as a programmer and as unemployed: I could.

Another motivation is the Covid-19 that now in 2020 is targetting the world. I fear looking into a too long period of unemployment. I know I have skills that I lack on my resume. I can't find any courses or educations that are within my reach to get these skills. So I have to learn them at home and I have to prove them in some way. Therefore this Github repository where you can see my new skills in play with a project I am highly motivated to work on and know will help me to a new job.

## Getting Started

The file \docker-compose.yml is the easy key to get you started if you know about Docker Compose. Otherwise read on.

The following instructions will only get you started with trying out the web app in your own private space. I will later add information on how to deploy it to your own public host. But as it is it should be completely usable for a single user.

### Prerequisites

The simple things you need to install are:

- Git to download the source code to build the web app from.
- Docker and Docker Compose to get a virtual host running with the web app.
- A major web browser like Google Chrome, Mozilla Firefox og Microsoft Edge. These are simply used to access the web app on the virtual host.

### Installing and run

Follow these instructions to install Git:  
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Follow these instructions to install Docker:  
https://docs.docker.com/get-docker/

Follow these instructions to install Docker Compose:  
https://docs.docker.com/compose/install/

Next you need to create a folder somewhere on your hard drive where you want the web app to reside. A suggestion would be to create a folder called "jobfinder" in your user folder. Then use this command in a terminal/command line to enter the new folder. For command line ake sure that you have admin priviliges on Windows:   
```
cd [the absolute path to the folder you created]
```
Next use this command to download the web app to the folder. Do not forget the punctuation mark at the end of the line:
```
git clone https://github.com/a-creative/job-finder.git .

```
Next use these two commands to start up the virtual host and initialize the database:
```
docker-compose up -d
docker-compose exec backend php artisan doctrine:migrations:migrate 
```
Finally you open up your favorite web browser and go to the addres:
```
http://localhost/:5001
```
At this point in time you should be up and running with the web app Job Finder in your browser.