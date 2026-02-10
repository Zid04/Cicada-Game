import Section from "../components/ui/Section";

const RULES = () => {
  return (
    <div className="p-5">

      <Section title="Cicada-3032: The Cybersecurity Board Game Rules">
        <h2 className="text-pink-500 text-lg">Welcome to Cicada-3032</h2>
        <p>
          Cicada-3032 is a board game centered around cybersecurity in which players compete to be the first to
          reach the center of the board. To achieve this, you will use Bonus cards to protect and benefit yourself, and
          Penalty cards to slow down or block your opponents as they progress across the board.
        </p>
      </Section>

      <Section title="Game Content">
        <ul className="list-disc ml-5">
          <li>The game board</li>
          <li>4 pawns</li>
          <li>3 dice:
            <ul className="list-disc ml-5">
              <li>1d10 (10-sided) – First Circle</li>
              <li>1d6 (6-sided) – Second Circle</li>
              <li>1d3 (3-sided) – Third Circle</li>
            </ul>
          </li>
          <li>1 "Draw" deck of 64 cards:
            <ul className="list-disc ml-5">
              <li>30 Bonus cards</li>
              <li>30 Penalty (Malus) cards</li>
              <li>4 Protection cards</li>
            </ul>
          </li>
          <li>1 "Trap" deck of 32 cards (various effects)</li>
          <li>1 "Quiz" deck of 16 cards</li>
        </ul>
      </Section>

      <Section title="Setting Up the Game">
        <ul className="list-disc ml-5">
          <li><strong>Place the Board:</strong> Unfold and place the board at the center of the table, with the decks next to it.</li>
          <li><strong>Choose Pawns:</strong> Each player chooses a pawn and places it on the Starting Space (note: this is not space 1).</li>
          <li><strong>Deal Cards:</strong> Deal 5 cards to each player.</li>
          <li><strong>Prepare Draw Deck:</strong> Add the 4 Protection cards to the "Draw" deck.</li>
          <li><strong>Shuffle:</strong> Shuffle each deck (Draw, Trap, Quiz).</li>
          <li><strong>Start:</strong> Begin the game!</li>
        </ul>
      </Section>

      <Section title="Turns">
        <p>A player's turn consists of 2 phases, which must be executed in order:</p>
        <ul className="list-disc ml-5">
          <li><strong>Draw Phase:</strong> The player draws one card from the Draw deck.</li>
          <li><strong>Action Phase:</strong> The player has 2 actions in a turn (1 Movement + 1 Card):
            <ul className="list-disc ml-5">
              <li><strong>Movement:</strong> The player rolls the die and moves forward a number of spaces equal to the result. This includes any bonus/penalty effects from cards.</li>
              <li>The player resolves the effect of the space they landed on.</li>
              <li>Phase: The player may use one Bonus card or one Penalty card.</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section title="Types of Spaces">
        <table className="table-auto border border-gray-600 w-full text-left mb-5">
          <thead>
            <tr className="bg-gray-800 text-pink-500">
              <th className="border px-2 py-1">Symbol</th>
              <th className="border px-2 py-1">Space Type</th>
              <th className="border px-2 py-1">Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">(Draw Symbol)</td>
              <td className="border px-2 py-1">Draw Space</td>
              <td className="border px-2 py-1">Draw one card from the Draw deck.</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">(Trap Symbol)</td>
              <td className="border px-2 py-1">Trap Space</td>
              <td className="border px-2 py-1">Draw one card from the Trap deck and apply its effect.</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">(+2)</td>
              <td className="border px-2 py-1">Move Forward</td>
              <td className="border px-2 py-1">Move forward 2 additional spaces.</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">(-2)</td>
              <td className="border px-2 py-1">Move Backward</td>
              <td className="border px-2 py-1">Move backward 2 spaces.</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">(?)</td>
              <td className="border px-2 py-1">Quiz Space</td>
              <td className="border px-2 py-1">(The effect for this space is not detailed in the rules provided.)</td>
            </tr>
          </tbody>
        </table>
      </Section>

    </div>
  );
};

export default RULES;
