import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

GOOGLE_PLACES_API_KEY = "Your_Google_Maps_API_key_here"

@api_view(['GET'])
def pharmacy_list(request):
    lat = request.GET.get("lat")
    lng = request.GET.get("lng")

    if not lat or not lng:
        return Response([])

    base_url = "https://maps.googleapis.com/maps/api/place"
    key = GOOGLE_PLACES_API_KEY

    nearby_url = (
        f"{base_url}/nearbysearch/json?location={lat},{lng}&radius=5000&type=pharmacy&key={key}"
    )
    nearby_response = requests.get(nearby_url)
    nearby_data = nearby_response.json()

    pharmacies = []

    for result in nearby_data.get("results", []):
        place_id = result.get("place_id")

        # Fetch detailed info
        details_url = f"{base_url}/details/json?place_id={place_id}&fields=name,formatted_phone_number&key={key}"
        details_response = requests.get(details_url)
        details_data = details_response.json().get("result", {})

        pharmacies.append({
            "name": result["name"],
            "lat": result["geometry"]["location"]["lat"],
            "lng": result["geometry"]["location"]["lng"],
            "address": result.get("vicinity", ""),
            "rating": result.get("rating"),
            "total_ratings": result.get("user_ratings_total"),
            "phone": details_data.get("formatted_phone_number", "N/A"),
        })

    return Response(pharmacies)


