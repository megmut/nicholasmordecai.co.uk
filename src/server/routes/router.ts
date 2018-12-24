import { Router } from 'express';
import * as csrf  from 'csurf';

import Technologies from './../data/technologies';
import BlogPostController from './../controllers/blogPostController';
import Breadcrumb from './../middleware/breadcrumb';

var csrfProtection = csrf({ cookie: true });
let router;

export default () => {
    router = Router();
    router.use('/', Breadcrumb);

    router.get('/', (req, res, next) => {
        res.render('pages/index', { home: true });
    });

    router.get('/test', (req, res, next) => {
        res.render('pages/test', { layout: 'test', home: true });
    });

    router.get('/about', (req, res, next) => {
        res.render('pages/about', { about: true, title: 'About Me', path: req.breadcrumbs });
    });

    router.get('/portfolio', (req, res, next) => {
        res.render('pages/portfolio', {
            portfolio: true,
            title: 'My Work',
            path: req.breadcrumbs,
            blogPost: BlogPostController.blogs
        });
    });

    router.get('/portfolio/:blogPostSlug', (req, res, next) => {
        let blogSlug = req.params.blogPostSlug;
        let blogData = BlogPostController.generateData(blogSlug);
        if (!blogData) {
            res.status(404).render('pages/404', { '404': true, title: '404 Not Found', slug: '404' });
            return;
        } else {
            res.render('pages/blog-single', {
                travels: true,
                title: blogData['title'],
                data: blogData,
                path: req.breadcrumbs
            });
        }
    });

    router.get('/technologies', (req, res, next) => {
        res.render('pages/technologies', {
            technologies: true,
            techs: Technologies.list,
            title: "Technologies I've used",
            path: req.breadcrumbs
        });
    });

    router.get('/contact', csrfProtection, (req, res, next) => {
        res.render('pages/contact', {
            contact: true,
            title: 'Contact Me',
            slug: 'Contact',
            csrfToken: req.csrfToken()
        });
    });

    router.get('/about/music', (req, res, next) => {
        res.render('pages/music', {
            music: true,
            title: 'My Music',
            path: req.breadcrumbs
        });
    });

    router.get('/about/photography', (req, res, next) => {
        res.render('pages/photography', {
            music: true,
            title: 'My Photography',
            path: req.breadcrumbs
        });
    });

    router.get('/about/travelling', (req, res, next) => {
        res.render('pages/travels', {
            travels: true,
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    router.get('/about/programming', (req, res, next) => {
        res.render('pages/travels', {
            travels: true,
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    return router;
}