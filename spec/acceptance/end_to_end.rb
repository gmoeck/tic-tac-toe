require_relative 'application_driver'

describe "end to end acceptance test", :type => :request do
  before(:each) do
    @application = TicTacToeApplicationDriver.new
    @application.start
  end

  it "shows that x wins when it does" do
    @application.mark_board(0,0)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(1,1)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(0,1)
    @application.shows_board(
      [
        ['X','X',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(2,1)
    @application.shows_board(
      [
        ['X','X',' '],
        [' ','O',' '],
        [' ','O',' ']
      ]
    )
    @application.mark_board(0,2)
    @application.shows_board(
      [
        ['X','X','X'],
        [' ','O',' '],
        [' ','O',' ']
      ]
    )
    @application.shows_winner_to_be_player_1
  end

  it "shows that O wins when it does" do
    @application.mark_board(0,0)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(1,1)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(0,1)
    @application.shows_board(
      [
        ['X','X',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(0,2)
    @application.shows_board(
      [
        ['X','X','O'],
        [' ','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(1,0)
    @application.shows_board(
      [
        ['X','X','O'],
        ['X','O',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(2,0)
    @application.shows_board(
      [
        ['X','X','O'],
        ['X','O',' '],
        ['O',' ',' ']
      ]
    )
    @application.shows_winner_to_be_player_2
  end

  it "ignores cells selected more than once" do
    @application.mark_board(0,0)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
      ]
    )
    @application.mark_board(0,0)
    @application.shows_board(
      [
        ['X',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
      ]
    )
  end
end
