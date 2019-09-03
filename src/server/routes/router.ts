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

    router.get('/.well-known/apple-developer-domain-association.txt', (req, res, next) => {
        res.send(`MIIP3QYJKoZIhvcNAQcCoIIPzjCCD8oCAQExCzAJBgUrDgMCGgUAMHIGCSqGSIb3DQEHAaBlBGN7
        InRlYW1JZCI6IlhTMzIzNFg4VkwiLCJkb21haW4iOiJtcnN3b3Jkc21pdGguY29tIiwiZGF0ZUNy
        ZWF0ZWQiOiIyMDE5LTA5LTAzLDEwOjM4OjA2IiwidmVyc2lvbiI6MX2gggyyMIID8zCCAtugAwIB
        AgIBFzANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEm
        MCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJv
        b3QgQ0EwHhcNMDcwNDEyMTc0MzI4WhcNMjIwNDEyMTc0MzI4WjB5MQswCQYDVQQGEwJVUzETMBEG
        A1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkx
        LTArBgNVBAMTJEFwcGxlIGlQaG9uZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTCCASIwDQYJKoZI
        hvcNAQEBBQADggEPADCCAQoCggEBAKMevvBHwLSeEFtGpLghuE-GIXAoRWBcHMPICmRjiPv8ae74
        VPzpW7cGTgQvw2szr0RM6kuACbSH9lu0_WTds3LgE7P9F9m856jtwoxhwir57M6lXtZp62QLjQiP
        uKBQRgncGeTlsJRtu_eZmMTom0FO1PFl4xtSetzoA9luHdoQVYakKVhJDOpH1xU0M_bAoERKcL4s
        tSowN4wuFevR5GyXOFVWsTUrWOpEoyaF7shmSuTPifA9Y60p3q26WrPcpaOapwlOgBY1ZaSFDWN7
        PmOK2n1KRuyjORg0ucYoZRi8E2Ccf1esFMmJ7aG2h2hStoROuMiD7PmeGauzwQuGx58CAwEAAaOB
        nDCBmTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH_BAUwAwEB_zAdBgNVHQ4EFgQU5zQqLiLeOWBr
        tJTOd4NhLzGgfDUwHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01_CF4wNgYDVR0fBC8wLTAr
        oCmgJ4YlaHR0cDovL3d3dy5hcHBsZS5jb20vYXBwbGVjYS9yb290LmNybDANBgkqhkiG9w0BAQUF
        AAOCAQEAHdHVe910TtcX_IItDJmbXkJy8mnc1WteDQxrSz57FCXes5TooPoPgInyFz0AAqKRkb50
        V9yvmp-hCn0wvgAqzCFZ6_1JrG51GeiaegPRhvbn9rAOS0n6o7dButfR41ahfYOrl674UUomwYVC
        EyaNA1RmEF5ghAUSMStrVMCgyEG8VB7nVK0TANJKx7vBiq-BCI7wRgq_J6a-3M85OoBwGSMyo2tm
        XZ5NqEdJsntFtVEzp3RnCU62bG9I9yy5MwVEa0W-dEtvsoaRtD4lKCWes8JRhvxP5a87qrtELAFJ
        4nSzNPpE7xTCEfItGRpRidMISkFsWFbemzrhBVflYs_SDzCCA_gwggLgoAMCAQICCD1yIOPPjPIl
        MA0GCSqGSIb3DQEBBQUAMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYD
        VQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMkQXBwbGUgaVBob25l
        IENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE0MDcxMTAxMzUyNVoXDTIyMDQxMjE3NDMyOFow
        WTELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xNTAzBgNVBAMMLEFwcGxlIGlQaG9u
        ZSBPUyBQcm92aXNpb25pbmcgUHJvZmlsZSBTaWduaW5nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
        MIIBCgKCAQEA59mawxejyekH1ceZpLR1IUwRA2gfMCwHnHeIMUjIRASNgc16xvjT9kccbU7uuuYU
        hXHE73mzS3XaaIWmc1WixodRe9ccgbUBauOMke56KvzPlV75caAofvmr1OHODk-V88rtt5UKMv8l
        mTb2mJ0ki2RXtvX9vkUh-a5EdrfqsDtpn21_ftcRm7LqQ6Ll_SZHzszEB-Lndcbb_H4WtaSTxnyv
        Pb3dwC-AeHY6TnzYZE8qJVGHQXYObuCTpCGqPl3KX6eLC0ClL7OzakrHxlO1H1wsioju5JAvn91S
        PhZBxjgeaCSPMS3baXHPoPNCGigRSnScptZ4SVgNxLwcW_E9ewIDAQABo4GjMIGgMB0GA1UdDgQW
        BBSkXms7_HpHcpFwCcEkvS87yXugvjAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFOc0Ki4i3jlg
        a7SUzneDYS8xoHw1MDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL2lwaG9u
        ZS5jcmwwCwYDVR0PBAQDAgeAMBEGCyqGSIb3Y2QGAgIBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEA
        irZWTkHSsfMhQ50L2cf_tJhYme1BpzDx79vagG0htrNc3L6H8TkhvMSh2ibS7abx7cARlRmsR7gq
        DmmY1ObmzmvqIsErpwFuQUwsHeMjjIYno4wXnMwb7thkMw9EDos7SGITYlTTcU2SLYE6_6bLjlxD
        cWyIMyI8ID8deLn_Gioh6HNpz5uhoeE96QwXvKlz1-lSusK2H6EihT64XBqymnufzMtQOv6Wx_xI
        R_Qkoq0-TPtK22ecA3EVJz-DUvuy9BkWqT6p7BTsXsIKp_NN0TCq1K24MqFQL01VyEInrBzOcmTw
        LOAJ5Ey5CyA1N5zVC5HEMR3QK-Jcgr190P4ImTCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEF
        BQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENl
        cnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIx
        NDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4x
        JjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBS
        b290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR-R2x5HUOsF7V55hC3r
        NqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN_QaiY-dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3
        M8vED03OFGnRyRly9V0O1X9fm_IlA7pVj01dDfFkNSMVSxVZHbOU9_acns9QusFYUGePCLQg98us
        LCBvcLY_ATCMt0PPD5098ytJKBrI_s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJH
        U1XBry9Bs_j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP_Z15lvEnY
        dp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH_BAQDAgEGMA8GA1UdEwEB_wQFMAMBAf8w
        HQYDVR0OBBYEFCvQaUeUdgn-9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn-9GuNLkCm
        90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0
        dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBv
        biB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhl
        IHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNl
        cnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjAN
        BgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t-2Mm9zzd5vydtJ3ME_BH4WDhRuZPUc38qmbQI4s1LGQ
        Eti-9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb-aTwpr_yv8WacFCXwXQFYRHnTTt4sj
        O0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q_Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4
        REjwYDieFfU9JmcgijNq9w2Cz97roy_5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU-12TZ_wYdV2aeZ
        uTJC-9jVcZ5-oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAowwggKIAgEB
        MIGFMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBD
        ZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMkQXBwbGUgaVBob25lIENlcnRpZmljYXRp
        b24gQXV0aG9yaXR5Agg9ciDjz4zyJTAJBgUrDgMCGgUAoIHcMBgGCSqGSIb3DQEJAzELBgkqhkiG
        9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE5MDkwMzEwMzgwNlowIwYJKoZIhvcNAQkEMRYEFKSSWVUs
        rrvp6laBVdG8CVivnQxLMCkGCSqGSIb3DQEJNDEcMBowCQYFKw4DAhoFAKENBgkqhkiG9w0BAQEF
        ADBSBgkqhkiG9w0BCQ8xRTBDMAoGCCqGSIb3DQMHMA4GCCqGSIb3DQMCAgIAgDANBggqhkiG9w0D
        AgIBQDAHBgUrDgMCBzANBggqhkiG9w0DAgIBKDANBgkqhkiG9w0BAQEFAASCAQC4aOmlckr5wAEU
        -GEU-0ldF9r943K4gC2XZNw2p26mVdNrPhOt_KkAaQXGqnTqci43PrCSNY6TADljjlOvT2zHMFCr
        E1c26NHmH64V-KVvzbl2FvRo-5PK2zNrM_mCuqfTe0O9my2GEYdkLDRHnLpZBZJ28-1_NxNNlzj9
        4W6ERuNMtYzH8bKiXtwQEWk2g9g9khq2j6r_tdf6C93sTxJdsB9XEGPDpBb5_-cXSCtS81gpNakH
        KODQo4le5GQRKQDZ8jwoXxnpq5U7dvbJ7dTxkISWs3b_baUTgorRUvx-e-gPteSMgVP7Xc5I4p_0
        9rGrYOMUOTh0nPtAPDrusGT-
        `);
    });

    router.get('/callback' , (req, res, next) => {
        console.log(req.params, req.body);
        res.status(200).end();
    });

    router.post('/callback' , (req, res, next) => {
        console.log(req.params, req.body);
        res.status(200).end();
    });

    router.get('/', (req, res, next) => {
        res.render('pages/index', { home: true, title: 'Home'});
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

    // router.get('/about/music', (req, res, next) => {
    //     res.render('pages/music', {
    //         music: true,
    //         title: 'My Music',
    //         path: req.breadcrumbs
    //     });
    // });

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
        res.render('pages/programming', {
            travels: true,
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    router.get('/resume', (req, res, next) => {
        res.render('pages/resume', {
            resume: true,
            title: 'Resume',
            path: req.breadcrumbs
        });
    });

    return router;
}