/* ========================================================
   BOOT SCREEN
======================================================== */

document.body.classList.add("loading");

const bootScreen =
  document.getElementById("bootScreen");

const bootProgress =
  document.getElementById("bootProgress");

const bootPercent =
  document.getElementById("bootPercent");

const bootLine1 =
  document.getElementById("bootLine1");

const bootLine2 =
  document.getElementById("bootLine2");

const bootLine3 =
  document.getElementById("bootLine3");


let bootValue = 0;


setTimeout(() => {
  bootLine1.classList.add("show");
}, 150);


setTimeout(() => {
  bootLine2.classList.add("show");
}, 420);


setTimeout(() => {
  bootLine3.classList.add("show");
}, 700);


const bootInterval =
  setInterval(() => {

    bootValue +=
      Math.floor(
        Math.random() * 8
      ) + 3;


    if (bootValue >= 100) {

      bootValue = 100;

      clearInterval(
        bootInterval
      );


      setTimeout(() => {

        bootScreen.classList.add(
          "hidden"
        );

        document.body.classList.remove(
          "loading"
        );

        revealVisibleItems();

      }, 400);

    }


    bootProgress.style.width =
      bootValue + "%";


    bootPercent.textContent =
      bootValue + "%";

  }, 45);



/* ========================================================
   STARFIELD CANVAS
======================================================== */

const canvas =
  document.getElementById(
    "spaceCanvas"
  );


const ctx =
  canvas.getContext(
    "2d"
  );


let stars = [];

let canvasWidth;

let canvasHeight;


function resizeCanvas() {

  canvasWidth =
    window.innerWidth;


  canvasHeight =
    window.innerHeight;


  canvas.width =
    canvasWidth *
    devicePixelRatio;


  canvas.height =
    canvasHeight *
    devicePixelRatio;


  canvas.style.width =
    canvasWidth + "px";


  canvas.style.height =
    canvasHeight + "px";


  ctx.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );


  createStars();

}


function createStars() {

  stars = [];


  const totalStars =
    Math.min(
      140,
      Math.floor(
        canvasWidth / 8
      )
    );


  for (
    let i = 0;
    i < totalStars;
    i++
  ) {

    stars.push({

      x:
        Math.random() *
        canvasWidth,

      y:
        Math.random() *
        canvasHeight,

      size:
        Math.random() *
        1.6 +
        0.2,

      speed:
        Math.random() *
        0.18 +
        0.04,

      opacity:
        Math.random() *
        0.45 +
        0.08

    });

  }

}


function animateStars() {

  ctx.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );


  stars.forEach(
    star => {

      star.y +=
        star.speed;


      if (
        star.y >
        canvasHeight
      ) {

        star.y =
          -5;

        star.x =
          Math.random() *
          canvasWidth;

      }


      ctx.beginPath();


      ctx.arc(
        star.x,
        star.y,
        star.size,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(
          255,
          255,
          255,
          ${star.opacity}
        )`;


      ctx.fill();

    }
  );


  requestAnimationFrame(
    animateStars
  );

}


resizeCanvas();

animateStars();


window.addEventListener(
  "resize",
  resizeCanvas
);



/* ========================================================
   CUSTOM CURSOR
======================================================== */

const cursorDot =
  document.getElementById(
    "cursorDot"
  );


const cursorRing =
  document.getElementById(
    "cursorRing"
  );


const cursorLight =
  document.getElementById(
    "cursorLight"
  );


let mouseX = 0;

let mouseY = 0;

let ringX = 0;

let ringY = 0;


document.addEventListener(
  "mousemove",
  event => {

    mouseX =
      event.clientX;


    mouseY =
      event.clientY;


    if (cursorDot) {

      cursorDot.style.left =
        mouseX + "px";


      cursorDot.style.top =
        mouseY + "px";

    }


    if (cursorLight) {

      cursorLight.style.left =
        mouseX + "px";


      cursorLight.style.top =
        mouseY + "px";

    }

  }
);



function updateCursor() {

  ringX +=
    (
      mouseX -
      ringX
    ) * 0.14;


  ringY +=
    (
      mouseY -
      ringY
    ) * 0.14;


  if (cursorRing) {

    cursorRing.style.left =
      ringX + "px";


    cursorRing.style.top =
      ringY + "px";

  }


  requestAnimationFrame(
    updateCursor
  );

}


updateCursor();



/* ========================================================
   CURSOR HOVER MODE
======================================================== */

const hoverTargets =
  document.querySelectorAll(
    `
    a,
    button,
    .skill-card,
    .project-screen
    `
  );


hoverTargets.forEach(
  element => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursorRing?.classList.add(
          "hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursorRing?.classList.remove(
          "hover"
        );

      }
    );

  }
);



/* ========================================================
   MOBILE MENU
======================================================== */

const menuButton =
  document.getElementById(
    "menuButton"
  );


const nav =
  document.getElementById(
    "nav"
  );


menuButton?.addEventListener(
  "click",
  () => {

    menuButton.classList.toggle(
      "open"
    );


    nav.classList.toggle(
      "open"
    );

  }
);


document
  .querySelectorAll(
    ".nav a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        menuButton?.classList.remove(
          "open"
        );


        nav?.classList.remove(
          "open"
        );

      }
    );

  });



/* ========================================================
   REVEAL ELEMENTS
======================================================== */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },

    {
      threshold:
        0.12
    }

  );


revealItems.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);



function revealVisibleItems() {

  revealItems.forEach(
    element => {

      const rect =
        element.getBoundingClientRect();


      if (
        rect.top <
        window.innerHeight *
        0.9
      ) {

        element.classList.add(
          "visible"
        );

      }

    }
  );

}



/* ========================================================
   3D TILT
======================================================== */

function addTilt(
  selector,
  strength = 55
) {

  document
    .querySelectorAll(
      selector
    )
    .forEach(
      element => {

        element.addEventListener(
          "mousemove",
          event => {

            if (
              window.innerWidth <
              800
            ) {

              return;

            }


            const rect =
              element
                .getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            const rotateY =
              (
                x -
                rect.width / 2
              ) /
              strength;


            const rotateX =
              (
                rect.height / 2 -
                y
              ) /
              strength;


            element.style.transform =
              `
              perspective(1200px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              scale(0.995)
              `;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              `
              perspective(1200px)
              rotateX(0deg)
              rotateY(0deg)
              scale(1)
              `;

          }
        );

      }
    );

}


addTilt(
  ".tilt-project",
  70
);


addTilt(
  ".tilt",
  35
);



/* ========================================================
   PORTAL PARALLAX
======================================================== */

const heroPortal =
  document.getElementById(
    "heroPortal"
  );


document.addEventListener(
  "mousemove",
  event => {

    if (
      !heroPortal ||
      window.innerWidth <
      1000
    ) {

      return;

    }


    const x =
      (
        event.clientX /
        window.innerWidth -
        0.5
      ) * 18;


    const y =
      (
        event.clientY /
        window.innerHeight -
        0.5
      ) * 18;


    heroPortal.style.transform =
      `
      translate(
        ${x}px,
        ${y}px
      )
      `;

  }
);



/* ========================================================
   MAGNETIC BUTTONS
======================================================== */

const magneticElements =
  document.querySelectorAll(
    ".magnetic"
  );


magneticElements.forEach(
  element => {

    element.addEventListener(
      "mousemove",
      event => {

        if (
          window.innerWidth <
          800
        ) {

          return;

        }


        const rect =
          element
            .getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        element.style.transform =
          `
          translate(
            ${x * 0.13}px,
            ${y * 0.13}px
          )
          `;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform =
          "translate(0,0)";

      }
    );

  }
);



/* ========================================================
   HEADER SCROLL
======================================================== */

const header =
  document.getElementById(
    "header"
  );


window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY >
      40
    ) {

      header.classList.add(
        "scrolled"
      );

    }

    else {

      header.classList.remove(
        "scrolled"
      );

    }

  }
);



/* ========================================================
   SCROLL PROGRESS
======================================================== */

const scrollProgress =
  document.getElementById(
    "scrollProgress"
  );


window.addEventListener(
  "scroll",
  () => {

    const pageHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;


    const progress =
      (
        window.scrollY /
        pageHeight
      ) *
      100;


    scrollProgress.style.width =
      progress + "%";

  }
);



/* ========================================================
   ACTIVE NAV
======================================================== */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navLinks =
  document.querySelectorAll(
    ".nav a"
  );


window.addEventListener(
  "scroll",
  () => {

    let current =
      "";


    sections.forEach(
      section => {

        const sectionTop =
          section.offsetTop -
          180;


        if (
          window.scrollY >=
          sectionTop
        ) {

          current =
            section.getAttribute(
              "id"
            );

        }

      }
    );


    navLinks.forEach(
      link => {

        link.classList.remove(
          "active"
        );


        if (
          link.getAttribute(
            "href"
          ) ===
          "#" + current
        ) {

          link.classList.add(
            "active"
          );

        }

      }
    );

  }
);



/* ========================================================
   SMOOTH LINKS
======================================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    anchor => {

      anchor.addEventListener(
        "click",
        event => {

          const id =
            anchor.getAttribute(
              "href"
            );


          if (
            !id ||
            id === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              id
            );


          if (!target) {

            return;

          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              "smooth",

            block:
              "start"

          });

        }
      );

    }
  );



/* ========================================================
   PROJECT SPOTLIGHT
======================================================== */

document
  .querySelectorAll(
    ".project-screen"
  )
  .forEach(
    project => {

      project.addEventListener(
        "mousemove",
        event => {

          const rect =
            project
              .getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          project.style.setProperty(
            "--mouse-x",
            x + "px"
          );


          project.style.setProperty(
            "--mouse-y",
            y + "px"
          );

        }
      );

    }
  );



/* ========================================================
   ESC CLOSE MENU
======================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Escape"
    ) {

      menuButton?.classList.remove(
        "open"
      );


      nav?.classList.remove(
        "open"
      );

    }

  }
);



/* ========================================================
   RESET MENU ON DESKTOP
======================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth >
      1050
    ) {

      menuButton?.classList.remove(
        "open"
      );


      nav?.classList.remove(
        "open"
      );

    }

  }
);



/* ========================================================
   CONSOLE
======================================================== */

console.log(
  "%cDAVID NIKOLAU // CREATOR SYSTEM",
  `
    color:#a98cff;
    font-size:20px;
    font-weight:bold;
  `
);


console.log(
  "%cWELCOME TO THE UNIVERSE",
  `
    color:#49d7ff;
    font-size:12px;
  `
);