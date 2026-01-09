export default function TestColors() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Color Test Page</h1>
      
      <div className="space-y-2">
        <div className="bg-purple text-white p-4 rounded">
          Purple Background (#cb6ce6)
        </div>
        
        <div className="bg-mint text-black p-4 rounded">
          Mint Background (#d5f8f3)
        </div>
        
        <div className="text-purple p-4 border border-purple rounded">
          Purple Text (#cb6ce6)
        </div>
        
        <div className="text-black p-4 border border-black rounded">
          Black Text (#000000)
        </div>
        
        <button className="bg-purple text-white px-6 py-3 rounded hover:opacity-90">
          Purple Button
        </button>
        
        <div className="bg-mint text-purple p-4 rounded">
          Mint Background with Purple Text
        </div>
      </div>
    </div>
  )
}
