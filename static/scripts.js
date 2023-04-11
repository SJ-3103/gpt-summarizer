// Add this function
function scrapeWebsite() {
    // const apiKey = $('#api_key').val();
    const urls = $('.url-input').map(function() {
        return $(this).val();
    }).get();

    if (urls.some(url => !url)) {
        alert('Please enter website URLs.');
        return;
    }

    $.ajax({
        url: '/scrape',
        method: 'POST',
        contentType: 'application/json',
        // data: JSON.stringify({ apiKey, urls }),
        data: JSON.stringify({  urls }),
        success: function(data) {
            $('.scraped-content').html(data.scrapedText);
        },
        error: function() {
            alert('Error in fetching data. Please try again.');
        }
    });
}

// Add this function
function summarizeContent() {
    // const apiKey = $('#api_key').val();
    const prompt = $('#prompt-input').val();
    const crawledText = $('.scraped-content').html();

    // if (!apiKey) {
    //     alert('Please enter the OpenAI API Key.');
    //     return;
    // }

    if (!prompt || !crawledText) {
        alert('Please make sure you have entered a prompt and crawled some text.');
        return;
    }

    // Show the spinner
    $('#summary-spinner').show();
    $('#summary-text').hide();

    $.ajax({
        url: '/summarize',
        method: 'POST',
        contentType: 'application/json',
        // data: JSON.stringify({ apiKey, prompt, crawledText }),
        data: JSON.stringify({ prompt, crawledText }),
        success: function(data) {
            $('#summary-spinner').hide();
            $('#summary-text').html(data.summary).show();
            // $('#summary-modal').modal('show');            
        },
        error: function() {
            $('#summary-spinner').hide();
            $('#summary-text').html('Error in fetching summary. Please try again.').show();
            // $('#summary-modal').modal('show');
        }
    });
}

$(document).ready(function() {
    let urlInputs = 1;

    // Update the click event listener for the '.add-url-btn' button
    $('.add-url-btn').on('click', function() {
        const newInput = $('<input type="text" class="url-input url-input-large" placeholder="Enter website URL">');
        const newScrapBtn = $('<button class="scrap-btn">Scrap</button>');
        
        // Remove the previous 'Scrap' button
        $('.scrap-btn').last().remove();

        // Insert the new text box and 'Scrap' button after the last '.url-input' element
        $('.url-input').last().after(newInput);
        newInput.after(newScrapBtn);
        
        // Add click event listener for the new 'Scrap' button
        newScrapBtn.on('click', function() {
            scrapeWebsite();
        });
    });

    $('.summarize-btn').on('click', function() {
        summarizeContent();
    });

    $('#summary-modal .close').on('click', function() {
        $('#summary-modal').hide();
    });

    $(window).on('click', function(event) {
        if (event.target === $('#summary-modal')[0]) {
            $('#summary-modal').hide();
        }
    });

    $('.scrap-btn').on('click', function() {
        scrapeWebsite();
    });    
});

