class ItinerarySerializer < ActiveModel::Serializer
  attributes :id, :origin, :destination, :waypoints
end
