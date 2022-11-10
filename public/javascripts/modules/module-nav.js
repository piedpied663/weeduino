export { nav, RefreshNavigate }
import { ui } from "/static/js/wd/module-ui.js";
let lastVisiblePanel;

let defaulPanel =
{
    cmd: '#ctlhome',
    panel: '#panelhome',
    layout: 'panel/home'
};
let profilPanel =
{
    cmd: '#ctrlprofil',
    panel: '#panelprofil',
    layout: 'panel/profil'
};

let debeugPanel =
{
    cmd: '#ctlhome',
    panel: '#panelhome',
    layout: 'panel/fan'
};
defaulPanel = debeugPanel
class Navigation {
    constructor() { };

    Init(_nav) {
        nav = _nav;
        nav.forEach(element => {
            // $(element.panel).hide();
            $(element.cmd).on('click', function () {
                if (ui.CurrentProfile.key == -1) {
                    RequestPanel(profilPanel);
                } else {
                    RequestPanel(element);
                }
                // TooglePanel($(element.panel));
            })
        });

        $('body').fadeIn('slow', function () {
            RequestPanel(defaulPanel);
        });


        // lastVisiblePanel = $(this.defaulPanel);
        // lastVisiblePanel.show();
    };

};
function RefreshNavigate() {
    nav.forEach(element => {
        // $(element.panel).hide();
        $(element.cmd).on('click', function () {
            RequestPanel(element);
            // TooglePanel($(element.panel));
        })
    });
}
function RequestPanel(panel) {
    // console.log('RequestPanel' ,panel)
    $.ajax(panel.layout + '.html',
        {
            dataType: 'json', // type of response data
            timeout: 500,     // timeout milliseconds
            success: function (response, status, xhr) {   // success callback function
                FlipPanel(response);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                $.ajax('panel/notfound.html',
                    {
                        dataType: 'json',
                        timeout: 500,
                        success: function (response) {
                            FlipPanel(response)
                        }
                    });
            }
        });

}
function FlipPanel(response) {

    // $(document).ready(function () {
    //     console.log("document loaded");
    //     $("body").fadeIn("fast", function () {
    $('#app').fadeOut('fast', function () {
        $('#app').text('');
        $('#app').append(response.data);
        $('#app').fadeIn("fast");

    });


    //         })
    //         $('#app').fadeIn("fast");

    //     });

    // });

}
function TooglePanel(panel) {
    let profile = ui.Saved.currentProfile;

    if (profile.keys == -1) {
        panel = $('#paneluser');
    }
    if ($(lastVisiblePanel).is(panel)) {
        return;
    } else {
        $(lastVisiblePanel).hide();
        if (panel.css('display') == 'none') {
            panel.show();
        } else
            if (panel.css('display')) {
                panel.hide();
            }

        lastVisiblePanel = panel;
    }
};

let nav = new Navigation();