require 'capybara/rspec'
require 'rack'

Capybara.default_wait_time = 2
Capybara.default_selector = :css
Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_driver = :chrome

class TicTacToeApplicationDriver
  include Capybara::DSL
  include Capybara::RSpecMatchers

  APPLICATION_PORT = 1234

  def initialize
    @application_server = ApplicationServer.new
  end

  def start
    @application_server.start
    visit "http://localhost:#{APPLICATION_PORT}/index.html"
  end

  def mark_board(row, column)
    cell_at(column, row).click
  end

  def shows_board(board)
    board.each_index do |row|
      board[row].each_index do |column|
        if board[row][column] != ' '
          cell_at(column, row).text.should == board[row][column]
        end
      end
    end
  end

  def shows_winner_to_be_player_1
    find(".alert").text.should == "'X' Wins"
  end

  def shows_winner_to_be_player_2
    find(".alert").text.should == "'O' Wins"
  end

  private
  def cell_at(x,y)
    find("[data-board-x='#{x}'][data-board-y='#{y}']")
  end

  class ApplicationServer
    def start
      system("./bin/build_application.js")
      @thread = Thread.new do
        Rack::Handler::Thin.run Rack::Directory.new(File.expand_path('public')), :Port => APPLICATION_PORT
      end
    end

    def stop
      @thead.kill
    end
  end
end

