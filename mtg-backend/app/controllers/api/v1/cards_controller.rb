class Api::V1::CardsController < ApplicationController

  def index
    cards = Card.all

    render json: cards
  end

  def search
    term = params[:search]

    url = "https://api.magicthegathering.io/v1/cards?name=#{term}"

    response = RestClient.get(url)
    data = JSON.parse(response)
    cards = data["cards"]

    created_cards = cards.map do |card|
      Card.find_or_create_by(
        name: card["name"],
        image_url: card["imageUrl"],
        api_id: card["id"],
        text: card["text"]
      )
    end
    render json: created_cards

  end

end
