class Channel < ApplicationCable::Channel
  def subscribed
    stream_from "realtime_#{params[:client_id]}"
  end
end
