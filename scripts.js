document.addEventListener('DOMContentLoaded', () => {
    // Function to generate projects HTML
    function generateProjectsHTML(id, projects) {
        const projectsList = document.getElementById(id);
        let projectsHTML = '';  // Use a separate variable to build the HTML content

        projects.forEach((project, index) => {
            let list = '';
            project.descriptions.forEach(description => {
                list += `<li>${description}</li>`;
            });

            projectsHTML += `
                <div>
                    <div class="card mb-3">
                        <div class="row g-0">
                            <h3 class="card-title pl-4 pt-3 pb-2">${project.title}</h5>
                            <div class="col-md-12 projects-list-parent">
                                <img src="${project.image}" class="img-fluid project-image" alt="${project.title}">
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <div class="card-body">
                                    <h5 class="card-title">Highlights</h5>
                                    <ul class="lists">${list}</ul>
                                    <div class="tech-stack col-md-12 col-sm-12">
                                        <p>Stack: ${project.tags.join(" | ")}</p>
                                    </div>

                                    <a href="${project.button_link}" class="btn btn-outline-secondary rounded-button" role="button">${project.button_type}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        projectsList.innerHTML = projectsHTML;
    }

    fetch('project-data.json')
    .then(response => response.json())
    .then(data => {
        generateProjectsHTML('projects-list-company', data.company_projects);
        generateProjectsHTML('projects-list-personal', data.personal_projects);
    })
    .catch(error => console.error('Error loading JSON file:', error));



    fetch('youtube-videos.json')
    .then(response => response.json())
    .then(videos => {
        const collage = document.getElementById('video-collage');
        videos.forEach((video, index) => {
            const col = document.createElement('div');
            col.className = 'container-fluid col-md-5 col-lg-4 col-sm-12 mt-2';
            const thumbnail = document.createElement('div');
            thumbnail.className = 'video-thumbnail';
            thumbnail.innerHTML = `
                <div class="video-container pd-1">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${video.videoId}" allowfullscreen></iframe>
                </div>`;
            thumbnail.addEventListener('click', () => {
                const iframeContainer = thumbnail.querySelector('.video-container');
                const iframe = iframeContainer.querySelector('iframe');
                iframeContainer.style.display = 'block';
                iframe.src += "?autoplay=1";
            });
            col.appendChild(thumbnail);
            collage.appendChild(col);
        });

        // Add class to the last two elements
        const children = Array.from(collage.children);
        if (children.length > 1) {
            children[children.length - 2].classList.add('last-two');
            children[children.length - 1].classList.add('last-two');
        }
    })
    .catch(error => console.error('Error loading video JSON:', error));


    const coll = document.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            console.log(content)
            console.log(content.style.maxHeight)
            if (content.style.maxHeight == "0px") {
                content.style.maxHeight = content.scrollHeight + "px";;
            } else {
                content.style.maxHeight = 0
            }
        });
    }
   
});
