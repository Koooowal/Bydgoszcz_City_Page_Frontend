(function ($) { // Funkcja anonimowa, która zapewnia, że kod jest uruchamiany po załadowaniu jQuery
    $.fn.extend({ // Rozszerza funkcję jQuery o nową metodę rotaterator
        rotaterator: function (options) { // Definiuje domyślne opcje dla metody rotaterator

            var defaults = { // Ustawia domyślną prędkość pauzy
                fadeSpeed: 500, // Domyślnie ustawione dziecko na null
                pauseSpeed: 100, // Łączy domyślne opcje z przekazanymi opcjami
                child: null // Dla każdego elementu w bieżącym zbiorze jQuery wykonuje poniższe funkcje
            }; // Przypisuje opcje do zmiennej o

            var options = $.extend(defaults, options); // Pobiera wszystkie dzieci bieżącego elementu

            return this.each(function () { // Jeśli brak specyficznego dziecka, wybiera pierwsze dziecko
                var o = options; // W przeciwnym razie używa podanego dziecka
                var obj = $(this); // Wykonuje efekt zanikania na wybranym dziecku
                var items = $(obj.children(), obj); // Po zakończeniu zanikania opóźnia przez czas pauzy i wykonuje efekt zanikania
                items.each(function () { // Wybiera następne dziecko, jeśli istnieje
                    $(this).hide(); // Jeśli brak następnego dziecka, wybiera pierwsze dziecko
                }) // Rekurencyjnie wywołuje metodę rotaterator dla następnego dziecka
                if (!o.child) { // Koniec rozszerzenia funkcji jQuery
                    var next = $(obj).children(':first'); // Funkcja uruchamia się po załadowaniu dokumentu
                } else { // Dodaje klasę 'js' do elementu body
                    var next = o.child; // Pobiera element menu
                } // Pobiera element linku menu
                $(next).fadeIn(o.fadeSpeed, function () { // Po kliknięciu na link menu wykonuje poniższe
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () { // Przełącza klasę 'active' na linku menu
                        var next = $(this).next(); // Przełącza klasę 'active' na menu
                        if (next.length == 0) { // Zatrzymuje domyślne działanie linku
                            next = $(obj).children(':first'); // Koniec funkcji gotowości dokumentu
                        } // Funkcja jQuery dla elementów z klasą features-post na zdarzenie hover
                        $(obj).rotaterator({ // Po najechaniu myszką pokazuje ukrytą zawartość
                            child: next, // Po opuszczeniu myszką chowa ukrytą zawartość
                            fadeSpeed: o.fadeSpeed, // Koniec funkcji hover
                            pauseSpeed: o.pauseSpeed // Funkcja uruchamia się po załadowaniu dokumentu
                        }); // Pobiera element wideo
                    }) // Po załadowaniu danych wideo wykonuje poniższe
                }); // Usuwa klasę 'd-none' z nakładki tekstowej wideo
            }); // Dodaje klasę 'd-none' do loadera wideo
        } // Uruchamia metodę rotaterator na elemencie z id 'rotate'
    }); // Ustawia bieżący rok w elemencie z klasą tm-current-year
})(jQuery); // Funkcja uruchamia się po załadowaniu zawartości dokumentu

$(document).ready(function() { // Funkcja uruchamia się po załadowaniu dokumentu
    $('body').addClass('js'); // Dodaje klasę 'js' do elementu body
    var $menu = $('#menu'), // Pobiera element menu
      $menulink = $('.menu-link'); // Pobiera element linku menu
    
  $menulink.click(function() { // Po kliknięciu na link menu wykonuje poniższe
    $menulink.toggleClass('active'); // Przełącza klasę 'active' na linku menu
    $menu.toggleClass('active'); // Przełącza klasę 'active' na menu
    return false; // Zatrzymuje domyślne działanie linku
  });}); // Koniec funkcji gotowości dokumentu

  

$("div.features-post").hover( // Funkcja jQuery dla elementów z klasą features-post na zdarzenie hover
    function() { // Po najechaniu myszką pokazuje ukrytą zawartość
        $(this).find("div.content-hide").slideToggle("medium"); 
    },
    function() { // Po opuszczeniu myszką chowa ukrytą zawartość
        $(this).find("div.content-hide").slideToggle("medium"); 
    }
 ); // Koniec funkcji hover
 

$(document).ready(function () { // Funkcja uruchamia się po załadowaniu dokumentu

    var video = document.getElementById("tm-welcome-video"); // Pobiera element wideo

    video.onloadeddata = function() { // Po załadowaniu danych wideo wykonuje poniższe
        $('#tm-video-text-overlay').removeClass('d-none'); // Usuwa klasę 'd-none' z nakładki tekstowej wideo
        $('#tm-video-loader').addClass('d-none'); // Dodaje klasę 'd-none' do loadera wideo

        $('#rotate').rotaterator({ // Uruchamia metodę rotaterator na elemencie z id 'rotate'
            fadeSpeed: 1000,
            pauseSpeed: 300
        });
    }
    document.querySelector('.tm-current-year').textContent = new Date().getFullYear(); // Ustawia bieżący rok w elemencie z klasą tm-current-year
});
document.addEventListener("DOMContentLoaded", function() { // Funkcja uruchamia się po załadowaniu zawartości dokumentu
    if (navigator.geolocation) { // Jeśli dostępna, pobiera bieżącą pozycję
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { // Jeśli niedostępna, wyświetla alert
        alert("Geolokalizacja nie jest wspierana przez tę przeglądarkę.");
    }
});

function showPosition(position) { // Funkcja pobiera pozycję użytkownika
    var lat = position.coords.latitude; // Pobiera szerokość geograficzną
    var lon = position.coords.longitude;
    // Wywołaj funkcję, która wygeneruje mapę z trasą
    generateMapWithRoute(lat, lon);
}

function showError(error) { // Funkcja obsługi błędów geolokalizacji
    switch (error.code) { // Obsługa odmowy dostępu do geolokalizacji
        case error.PERMISSION_DENIED:
            alert("Użytkownik odmówił udzielenia geolokalizacji.");
            break; // Obsługa niedostępnej pozycji
        case error.POSITION_UNAVAILABLE:
            alert("Informacja o lokalizacji niedostępna.");
            break; // Obsługa przekroczenia czasu oczekiwania
        case error.TIMEOUT:
            alert("Przekroczono czas oczekiwania na lokalizację.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Nieznany błąd.");
            break;
    }
}

function generateMapWithRoute(lat, lon) { // Ustawia pozycję docelową
    var userLocation = { lat: lat, lng: lon };
    var destination = { lat: 53.12, lng: 18.00 }; // Zmień na docelowe współrzędne

    var map = new google.maps.Map(document.getElementById('map'), { // Tworzy nową mapę Google
        zoom: 10,
        center: userLocation
    });

    var directionsService = new google.maps.DirectionsService(); // Ustawia usługę tras Google
    var directionsRenderer = new google.maps.DirectionsRenderer(); // Ustawia renderer tras na mapie
    directionsRenderer.setMap(map);

    var request = { // Tworzy żądanie trasy
        origin: userLocation,
        destination: destination,
        travelMode: 'DRIVING' // Można zmienić na 'WALKING', 'BICYCLING', 'TRANSIT'
    };

    directionsService.route(request, function(result, status) { // Wykonuje żądanie trasy do usługi tras Google
        if (status == 'OK') { // Jeśli trasa jest dostępna, ustawia ją na rendererze
            directionsRenderer.setDirections(result);
        } else {
            alert('Nie można wygenerować trasy: ' + status);
        }
    });
}

function savePreferences() { // Funkcja zapisująca preferencje
    const name = document.getElementById('name').value; // Pobiera wartość pola nazwy
    const address = document.getElementById('address').value; // Pobiera wartość pola adresu
    const email = document.getElementById('email').value; // Pobiera wartość pola email
    const country = document.getElementById('country').value; // Pobiera wartość pola kraju
    const gender = document.querySelector('input[name="gender"]:checked').value; // Pobiera wartość zaznaczonego pola płci
    const attractions = Array.from(document.querySelectorAll('input[name="attractions"]:checked'))
                            .map(checkbox => checkbox.value); // Pobiera wartości zaznaczonych atrakcji

    const preferences = { // Tworzy obiekt preferencji
        name,
        address,
        email,
        country,
        gender,
        attractions
    };

    localStorage.setItem('postcardPreferences', JSON.stringify(preferences)); // Zapisuje preferencje w localStorage
    alert('Preferencje zapisane!'); // Wyświetla alert o zapisaniu preferencji
}

function saveContactFormData() { // Funkcja zapisująca dane formularza kontaktowego
    const name = document.getElementById('contact_name').value; // Pobiera wartość pola nazwy kontaktu
    const email = document.getElementById('contact_email').value; // Pobiera wartość pola email kontaktu
    const message = document.getElementById('contact_message').value; // Pobiera wartość pola wiadomości kontaktu

    const contactData = { // Tworzy obiekt danych kontaktowych
        name,
        email,
        message
    };

    sessionStorage.setItem('contactData', JSON.stringify(contactData)); // Zapisuje dane kontaktowe w sessionStorage
    alert('Dane formularza kontaktowego zapisane na czas sesji!'); // Wyświetla alert o zapisaniu danych kontaktowych
}

document.addEventListener('DOMContentLoaded', function() { // Funkcja uruchamia się po załadowaniu zawartości dokumentu
    document.querySelector('.tm-contact-form').addEventListener('submit', saveContactFormData); // Dodaje nasłuchiwacz zdarzenia submit do formularza kontaktowego
});

$(document).ready(function () { // Funkcja uruchamia się po załadowaniu dokumentu
    $('.nav li:first').addClass('active'); // Dodaje klasę 'active' do pierwszego elementu nawigacji

    var showSection = function showSection(section, isAnimate) { // Funkcja pokazująca sekcję
        var direction = section.replace(/#/, ''), // Pobiera kierunek z linku
            reqSection = $('.section').filter('[data-section="' + direction + '"]'), // Pobiera sekcję zgodnie z kierunkiem
            reqSectionPos = reqSection.offset().top - 0; // Pobiera pozycję sekcji

        if (isAnimate) { // Jeśli animacja jest włączona, przewija do pozycji sekcji
            $('body, html').animate({
                scrollTop: reqSectionPos
            }, 800);
        } else { // Jeśli animacja jest wyłączona, przewija do pozycji sekcji
            $('body, html').scrollTop(reqSectionPos);
        }
    };

    var checkSection = function checkSection() { // Funkcja sprawdzająca aktywną sekcję
        $('.section').each(function () { // Dla każdej sekcji wykonuje poniższe
            var $this = $(this), // Pobiera element sekcji
                topEdge = $this.offset().top - 80, // Pobiera górną krawędź sekcji
                bottomEdge = topEdge + $this.height(), // Pobiera dolną krawędź sekcji
                wScroll = $(window).scrollTop(); // Pobiera bieżący scroll
            if (topEdge < wScroll && bottomEdge > wScroll) { // Jeśli sekcja jest w zakresie widoczności, wykonuje poniższe
                var currentId = $this.data('section'), // Pobiera id bieżącej sekcji
                    reqLink = $('a').filter('[href*=\#' + currentId + ']'); // Pobiera link odpowiadający bieżącej sekcji
                reqLink.closest('li').addClass('active') // Dodaje klasę 'active' do linku
                    .siblings().removeClass('active'); // Usuwa klasę 'active' z rodzeństwa
            }
        });
    };

    $('.main-menu, .scroll-to-section').on('click', 'a', function (e) { // Nasłuchiwacz zdarzenia kliknięcia na link w menu
        if ($(e.target).hasClass('external')) {
            return;
        }
        e.preventDefault();
        $('#menu').removeClass('active');
        showSection($(this).attr('href'), true);
    });

    $(window).scroll(function () { // Nasłuchiwacz zdarzenia scroll
        checkSection(); // Sprawdza aktywną sekcję
    });
    checkSection(); // Początkowe sprawdzenie sekcji przy załadowaniu
});