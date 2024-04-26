# frozen_string_literal: true

module Allmaps
  class AnnotationsController < ApplicationController
    # JSON Only
    respond_to :json

    # Set @annotation before show and update
    before_action :set_annotation, only: %i[show update]

    # GET /allmaps/annotations.json
    def index
      @annotations = Blacklight::Allmaps::Sidecar.order(:id).page params[:page]

      respond_to do |format|
        format.all { render json: @annotations }
      end
    end

    # GET /allmaps/annotations/1.json
    def show
      respond_to do |format|
        format.all { render json: @annotation }
      end
    end

    # PATCH/PUT /allmaps/annotations/1.json
    def update
      # Background Job to store the Allmaps Annotation
      Blacklight::Allmaps::StoreSidecarAnnotation.perform_later(@annotation.solr_document_id)

      respond_to do |format|
        format.json { render json: @annotation, status: :ok }
      end
    end

    # GET /annotations/fetch/1.json
    def fetch
      # Background Job to store the Allmaps Annotation — Perform Now

      Blacklight::Allmaps::StoreSidecarAnnotation.perform_now(params[:id])
      set_annotation

      respond_to do |format|
        format.all { render json: @annotation }
      end
    rescue Blacklight::Exceptions::RecordNotFound
      render json: {error: "Record not found"}, status: :not_found
    end

    private

    # Find the annotation or throw a 404
    def set_annotation
      @annotation = Blacklight::Allmaps::Sidecar.where(solr_document_id: params[:id]).first!
    rescue ActiveRecord::RecordNotFound
      render json: {error: "Record not found"}, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def annotation_params
      params.require(:Blacklight::Allmaps::Sidecar).permit(:id, :solr_document_id)
    end
  end
end
