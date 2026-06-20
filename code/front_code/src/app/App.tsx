import { type ReactNode, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Download,
  FileArchive,
  ImagePlus,
  Info,
  ListChecks,
  LockKeyhole,
  Package,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share2,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Upload,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";

type RecipeStatus = "mastered" | "learning" | "challenge" | "quick";
type Screen = "recipes" | "cook" | "growth" | "tools" | "settings";

const recipes = [
  {
    id: 1,
    name: "家常红烧肉",
    version: "v3",
    tags: ["拿手菜", "荤菜", "慢炖"],
    rating: 4.8,
    cookCount: 18,
    status: "mastered" as RecipeStatus,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=260&h=260&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "蒜香黄油虾",
    version: "v2",
    tags: ["快手菜", "海鲜", "宴客"],
    rating: 4.6,
    cookCount: 12,
    status: "mastered" as RecipeStatus,
    img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=260&h=260&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "麻婆豆腐",
    version: "v2",
    tags: ["学习中", "川味", "下饭"],
    rating: 4.3,
    cookCount: 9,
    status: "learning" as RecipeStatus,
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=260&h=260&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "蛋炒饭",
    version: "v1",
    tags: ["快手菜", "主食"],
    rating: 4.5,
    cookCount: 22,
    status: "quick" as RecipeStatus,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=260&h=260&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "糖醋里脊",
    version: "v2",
    tags: ["想攻克", "酸甜口", "荤菜"],
    rating: 4.1,
    cookCount: 7,
    status: "challenge" as RecipeStatus,
    img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=260&h=260&fit=crop&auto=format",
  },
];

const inspirations = [
  { title: "复刻夜市铁板鱿鱼", source: "抖音视频", tag: "想尝试", color: "#FF6B35" },
  { title: "外婆的雪菜黄鱼汤", source: "一句话灵感", tag: "家乡味", color: "#86B049" },
  { title: "B站番茄牛腩教程", source: "B站链接", tag: "待整理", color: "#F4A261" },
];

const ingredients = [
  ["五花肉", "500g"],
  ["生抽", "2勺"],
  ["老抽", "半勺"],
  ["冰糖", "30g"],
  ["八角", "2颗"],
  ["黄酒", "3勺"],
];

const steps = [
  "五花肉冷水下锅，加入姜片和料酒，煮开后捞出擦干。",
  "小火炒冰糖到琥珀色，放入五花肉翻炒上色。",
  "加入生抽、老抽、黄酒和香料，加热水没过肉块。",
  "小火炖 80 分钟，最后开盖收汁，尝咸淡后出锅。",
];

const badges = [
  { name: "初入江湖", note: "完成第一次记录", unlocked: true, icon: "🥚" },
  { name: "复盘达人", note: "写满20篇日记", unlocked: true, icon: "📝" },
  { name: "小有所成", note: "同一道菜成功3次", unlocked: true, icon: "🍳" },
  { name: "独当一面", note: "掌握10道菜", unlocked: false, icon: "🥘" },
  { name: "连续挑战", note: "连续7天下厨", unlocked: false, icon: "🔥" },
];

const shoppingGroups = [
  { title: "荤菜", items: ["五花肉 500g", "鲜虾 300g", "里脊肉 400g"] },
  { title: "素菜", items: ["豆腐 1盒", "小葱 1把", "番茄 3个"] },
  { title: "调料", items: ["冰糖", "黄酒", "郫县豆瓣酱"] },
];

function PhoneHeader() {
  return (
    <div className="flex justify-between items-center px-8 pt-3 pb-1 flex-shrink-0">
      <span className="text-xs font-bold text-[#2D2013]">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5 items-end h-3">
          {[2, 3, 4, 4].map((h, i) => (
            <div key={i} className="w-1 bg-[#2D2013] rounded-sm" style={{ height: `${h * 3}px` }} />
          ))}
        </div>
        <div className="text-[10px] font-bold text-[#2D2013]">WiFi</div>
        <div className="w-6 h-3 rounded-sm border-[1.5px] border-[#2D2013] relative">
          <div className="absolute inset-0.5 bg-[#2D2013] rounded-[1px]" style={{ right: "25%" }} />
          <div className="absolute -right-0.5 top-[3px] w-0.5 h-1.5 bg-[#2D2013] rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

function PageTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="px-5 pt-5 pb-3 bg-[#FAFAF8]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2D2013]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h1>
        {action}
      </div>
    </div>
  );
}

function IconButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center border border-[rgba(180,140,100,0.15)] active:scale-95 transition-transform"
    >
      {children}
    </button>
  );
}

function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.floor(rating) ? "fill-[#FF6B35] text-[#FF6B35]" : "text-[#E0D5C5]"}
        />
      ))}
      <span className="ml-1 text-xs text-[#8C7B6B]">{rating.toFixed(1)}</span>
    </div>
  );
}

function EmptyState({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <div className="mx-5 mt-4 rounded-2xl bg-white border border-dashed border-[rgba(180,140,100,0.25)] p-6 text-center shadow-sm">
      <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-[#FFF0E8] flex items-center justify-center">
        <BookOpen size={24} className="text-[#FF6B35]" />
      </div>
      <div className="font-bold text-[#2D2013] text-sm">{title}</div>
      <div className="text-xs text-[#8C7B6B] mt-1 mb-4">{text}</div>
      <button className="px-4 py-2 rounded-full bg-[#FF6B35] text-white text-xs font-bold">{button}</button>
    </div>
  );
}

function RecipeListScreen({ onSelect }: { onSelect: () => void }) {
  const [activeTag, setActiveTag] = useState("全部");
  const [showInbox, setShowInbox] = useState(false);
  const tags = ["全部", "已掌握", "学习中", "想攻克", "快手菜"];

  const filtered = recipes.filter((recipe) => {
    if (activeTag === "全部") return true;
    if (activeTag === "已掌握") return recipe.status === "mastered";
    if (activeTag === "学习中") return recipe.status === "learning";
    if (activeTag === "想攻克") return recipe.status === "challenge";
    if (activeTag === "快手菜") return recipe.tags.includes("快手菜");
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <PageTitle
        title="我的菜谱"
        action={
          <div className="flex items-center gap-3">
            <IconButton>
              <Search size={17} className="text-[#8C7B6B]" />
            </IconButton>
            <IconButton onClick={() => setShowInbox(true)}>
              <div className="relative">
                <Package size={17} className="text-[#8C7B6B]" />
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D9534F] text-white text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
            </IconButton>
          </div>
        }
      />

      <div className="px-5 pb-3 bg-[#FAFAF8]">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTag === tag
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "bg-white text-[#8C7B6B] border border-[rgba(180,140,100,0.2)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowInbox(true)}
          className="mt-3 w-full rounded-2xl bg-[#FFF8F0] border border-[rgba(255,107,53,0.18)] px-3 py-2.5 flex items-center gap-2 text-left active:scale-[0.99] transition-transform"
        >
          <Sparkles size={16} className="text-[#FF6B35]" />
          <span className="text-xs text-[#4A3828] flex-1">灵感箱有 3 条待整理内容，下拉或点此整理成菜谱</span>
          <ChevronRight size={15} className="text-[#C4B5A0]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 scrollbar-hide">
        {filtered.length === 0 ? (
          <EmptyState title="菜谱库还是空的" text="一口锅、一把铲，记录你的第一道菜。" button="新建菜谱" />
        ) : (
          filtered.map((recipe) => (
            <button
              key={recipe.id}
              onClick={onSelect}
              className="w-full bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-[rgba(180,140,100,0.1)] active:scale-[0.99] transition-transform text-left"
            >
              <div className="w-[82px] h-[82px] rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EFE6]">
                <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <span className="font-bold text-[#2D2013] text-sm leading-tight">{recipe.name}</span>
                  <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[#FFF0E8] text-[#FF6B35] text-[10px] font-bold flex-shrink-0">
                    {recipe.version}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#8C7B6B]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <StarRow rating={recipe.rating} />
                  <span className="text-[10px] text-[#8C7B6B]">{recipe.cookCount} 次实践</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <button
        className="absolute bottom-[76px] right-5 w-14 h-14 rounded-full bg-[#FF6B35] shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        style={{ boxShadow: "0 4px 20px rgba(255,107,53,0.4)" }}
      >
        <Plus size={26} className="text-white" />
      </button>

      {showInbox && <InspirationSheet onClose={() => setShowInbox(false)} />}
    </div>
  );
}

function InspirationSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 rounded-[44px]" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#E0D5C5] rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-[#2D2013]">灵感收集箱</div>
            <div className="text-xs text-[#8C7B6B]">先收着，想做的时候再整理成菜谱</div>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-[#FFF0E8] text-[#FF6B35] text-xs font-bold">新增</button>
        </div>
        <div className="space-y-2">
          {inspirations.map((item) => (
            <div key={item.title} className="rounded-2xl bg-[#FAFAF8] border border-[rgba(180,140,100,0.1)] p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                <Play size={18} fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#2D2013] text-sm">{item.title}</div>
                <div className="text-xs text-[#8C7B6B]">{item.source}</div>
              </div>
              <button className="px-2.5 py-1 rounded-full bg-[#86B049] text-white text-[10px] font-bold">转菜谱</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecipeDetailScreen({ onBack }: { onBack: () => void }) {
  const [version, setVersion] = useState("v3");
  const [showExtract, setShowExtract] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const versions = ["v1", "v2", "v3"];

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between px-4 pt-5 pb-3 bg-[#FAFAF8] sticky top-0 z-10">
        <IconButton onClick={onBack}>
          <ArrowLeft size={17} className="text-[#2D2013]" />
        </IconButton>
        <span className="font-bold text-[#2D2013] text-sm">家常红烧肉</span>
        <button className="px-3 py-1.5 rounded-full bg-[#FFF0E8] text-[#FF6B35] text-xs font-semibold">编辑</button>
      </div>

      <div className="mx-5 rounded-2xl overflow-hidden h-44 bg-[#F5EFE6]">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=350&fit=crop&auto=format"
          alt="家常红烧肉"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mx-5 mt-3 flex bg-white rounded-xl p-1 shadow-sm border border-[rgba(180,140,100,0.1)]">
        {versions.map((item) => (
          <button
            key={item}
            onClick={() => setVersion(item)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              version === item ? "bg-[#FF6B35] text-white shadow-sm" : "text-[#8C7B6B]"
            }`}
          >
            {item}
          </button>
        ))}
        <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-[#FF6B35] flex items-center justify-center gap-0.5">
          <Plus size={12} /> 新版本
        </button>
      </div>

      <div className="px-5 mt-4 space-y-4 pb-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowExtract(true)}
            className="rounded-2xl bg-[#FFF8F0] border border-[rgba(255,107,53,0.2)] p-3 text-left"
          >
            <Sparkles size={18} className="text-[#FF6B35] mb-2" />
            <div className="text-sm font-bold text-[#2D2013]">智能提取</div>
            <div className="text-[10px] text-[#8C7B6B]">粘贴链接或截图识别</div>
          </button>
          <button onClick={() => setShowShare(true)} className="rounded-2xl bg-white border border-[rgba(180,140,100,0.1)] p-3 text-left shadow-sm">
            <Share2 size={18} className="text-[#86B049] mb-2" />
            <div className="text-sm font-bold text-[#2D2013]">生成分享卡</div>
            <div className="text-[10px] text-[#8C7B6B]">菜名、评分与心得</div>
          </button>
        </div>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#2D2013] text-sm">食材清单</h3>
            <button className="text-[#FF6B35] text-xs font-semibold flex items-center gap-0.5">
              <Plus size={12} /> 添加
            </button>
          </div>
          {ingredients.map(([item, amount]) => (
            <div key={item} className="flex justify-between py-1.5 border-b border-[rgba(180,140,100,0.08)] last:border-0">
              <span className="text-sm text-[#2D2013]">{item}</span>
              <span className="text-sm text-[#8C7B6B]">{amount}</span>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <h3 className="font-bold text-[#2D2013] text-sm mb-3">做法步骤</h3>
          {steps.map((step, index) => (
            <div key={step} className="flex gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-[#4A3828] flex-1 leading-relaxed">{step}</p>
            </div>
          ))}
        </section>

        <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] flex items-center justify-center">
            <Play size={18} className="text-[#FF6B35] fill-[#FF6B35]" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[#2D2013]">视频教程链接</div>
            <div className="text-xs text-[#8C7B6B]">跳转到 B站 / 抖音 / 浏览器</div>
          </div>
          <ChevronRight size={16} className="ml-auto text-[#C4B5A0]" />
        </button>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <h3 className="font-bold text-[#2D2013] text-sm mb-3">下厨记录</h3>
          {[
            { date: "2026-06-15", success: true, text: "收汁时间刚好，肉皮软糯。" },
            { date: "2026-05-30", success: true, text: "少放了老抽，颜色更清亮。" },
            { date: "2026-05-10", success: false, text: "火太急，底部略糊。" },
          ].map((item) => (
            <div key={item.date} className="flex items-start gap-3 py-2 border-b border-[rgba(180,140,100,0.08)] last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${item.success ? "bg-[#86B049]" : "bg-[#D9534F]"}`} />
              <div className="flex-1">
                <div className="text-sm text-[#4A3828]">{item.date}</div>
                <div className="text-xs text-[#8C7B6B]">{item.text}</div>
              </div>
              {item.success ? <CheckCircle size={16} className="text-[#86B049]" /> : <XCircle size={16} className="text-[#D9534F]" />}
            </div>
          ))}
        </section>
      </div>

      {showExtract && <ExtractSheet onClose={() => setShowExtract(false)} />}
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
    </div>
  );
}

function ExtractSheet({ onClose }: { onClose: () => void }) {
  const [parsed, setParsed] = useState(false);

  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 rounded-[44px]" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#E0D5C5] rounded-full mx-auto mb-4" />
        <div className="font-bold text-[#2D2013] mb-1">智能提取菜谱</div>
        <div className="text-xs text-[#8C7B6B] mb-4">本地解析文本、截图 OCR 或链接内容，识别不完整时可继续手动补充。</div>
        <textarea
          className="w-full h-24 rounded-2xl bg-[#FAFAF8] border border-[rgba(180,140,100,0.15)] p-3 text-sm text-[#2D2013] focus:outline-none focus:border-[#FF6B35]"
          placeholder="粘贴图文、视频链接，或复制来的步骤文本..."
          defaultValue="红烧肉：五花肉500g，冰糖30g，生抽2勺。先焯水，再炒糖色，小火炖80分钟。"
        />
        {parsed && (
          <div className="mt-3 rounded-2xl bg-[#FFF8F0] border border-[rgba(255,107,53,0.2)] p-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2D2013]">
              <CheckCircle size={16} className="text-[#86B049]" /> 已提取 3 个食材、3 个步骤
            </div>
            <div className="text-xs text-[#8C7B6B] mt-1">请核对用量和火候，确认后会自动填入当前版本。</div>
          </div>
        )}
        <button
          onClick={() => setParsed(true)}
          className="mt-4 w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white font-bold text-sm active:scale-[0.98] transition-transform"
        >
          {parsed ? "填入当前版本" : "开始解析"}
        </button>
      </div>
    </div>
  );
}

function ShareSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 rounded-[44px]" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#E0D5C5] rounded-full mx-auto mb-4" />
        <div className="rounded-2xl overflow-hidden bg-[#2D2013] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=640&h=360&fit=crop&auto=format"
            alt="分享卡预览"
            className="w-full h-36 object-cover"
          />
          <div className="p-4 text-white">
            <div className="text-lg font-bold">家常红烧肉</div>
            <div className="mt-1 flex items-center gap-2">
              <StarRow rating={4.8} />
              <span className="text-xs text-white/70">第 18 次实践</span>
            </div>
            <div className="text-xs text-white/80 mt-3">秘诀：小火慢炖，最后 8 分钟开盖收汁。</div>
          </div>
        </div>
        <button className="mt-4 w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white font-bold text-sm">生成并分享</button>
      </div>
    </div>
  );
}

function CookRecordScreen() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(recipes[0].id);
  const [scores, setScores] = useState({ color: 4, aroma: 4, taste: 5, texture: 4, fidelity: 3 });
  const [success, setSuccess] = useState(true);
  const [note, setNote] = useState("");
  const average = useMemo(() => Object.values(scores).reduce((sum, item) => sum + item, 0) / 5, [scores]);

  const updateScore = (key: keyof typeof scores, value: number) => setScores((current) => ({ ...current, [key]: value }));

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="px-5 pt-5 pb-4 bg-[#FAFAF8] sticky top-0 z-10 border-b border-[rgba(180,140,100,0.1)]">
        <div className="flex items-center gap-2">
          {["选菜", "拍照", "复盘"].map((label, index) => {
            const current = index + 1;
            return (
              <div key={label} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(current)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === current ? "bg-[#FF6B35] text-white" : current < step ? "bg-[#86B049] text-white" : "bg-[#F5EFE6] text-[#8C7B6B]"
                  }`}
                >
                  {current < step ? <Check size={14} /> : current}
                </button>
                {index < 2 && <div className="w-8 h-0.5 bg-[#F0EBE1]" />}
              </div>
            );
          })}
          <span className="ml-1 text-xs font-semibold text-[#FF6B35]">{["选择菜谱", "记录成品", "评分复盘"][step - 1]}</span>
        </div>
      </div>

      {step === 1 && (
        <div className="px-5 py-4 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#C4B5A0]" />
            <input
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[rgba(180,140,100,0.12)] text-sm focus:outline-none focus:border-[#FF6B35]"
              placeholder="搜索菜谱或快速新建"
            />
          </div>
          <div>
            <div className="font-bold text-[#2D2013] text-sm mb-3">最近常做</div>
            <div className="space-y-3">
              {recipes.slice(0, 4).map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelected(recipe.id)}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left border transition-all ${
                    selected === recipe.id ? "bg-[#FFF8F0] border-[#FF6B35] shadow-sm" : "bg-white border-[rgba(180,140,100,0.1)]"
                  }`}
                >
                  <img src={recipe.img} alt={recipe.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#2D2013]">{recipe.name}</div>
                    <div className="text-xs text-[#8C7B6B]">{recipe.version} · 已做 {recipe.cookCount} 次</div>
                  </div>
                  {selected === recipe.id && <CheckCircle size={18} className="text-[#FF6B35]" />}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white font-bold">下一步</button>
        </div>
      )}

      {step === 2 && (
        <div className="px-5 py-4 space-y-4">
          <div className="bg-white rounded-2xl h-56 flex flex-col items-center justify-center gap-3 shadow-sm border border-dashed border-[rgba(180,140,100,0.3)]">
            <div className="w-14 h-14 rounded-full bg-[#FFF0E8] flex items-center justify-center">
              <Camera size={24} className="text-[#FF6B35]" />
            </div>
            <span className="text-sm font-bold text-[#2D2013]">添加本次成品照片</span>
            <span className="text-xs text-[#8C7B6B]">支持连拍，照片会随备份包一起迁移</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <button key={item} className="aspect-square rounded-2xl bg-[#F5EFE6] border border-[rgba(180,140,100,0.1)] flex items-center justify-center">
                <ImagePlus size={20} className="text-[#C4B5A0]" />
              </button>
            ))}
          </div>
          <button onClick={() => setStep(3)} className="w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white font-bold">开始复盘</button>
        </div>
      )}

      {step === 3 && (
        <div className="px-5 py-4 space-y-4 pb-6">
          <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#2D2013] text-sm">多维评分</h3>
              <span className="text-2xl font-bold text-[#FF6B35]">{average.toFixed(1)}</span>
            </div>
            {[
              ["color", "色泽"],
              ["aroma", "香气"],
              ["taste", "味道"],
              ["texture", "口感"],
              ["fidelity", "还原度"],
            ].map(([key, label]) => {
              const score = scores[key as keyof typeof scores];
              return (
                <div key={key} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-[#2D2013]">{label}</span>
                    <StarRow rating={score} size={14} />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={score}
                    onChange={(event) => updateScore(key as keyof typeof scores, Number(event.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #FF6B35 ${(score - 1) * 25}%, #E0D5C5 ${(score - 1) * 25}%)` }}
                  />
                </div>
              );
            })}
          </section>

          <div className="flex gap-3">
            <button
              onClick={() => setSuccess(true)}
              className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold ${
                success ? "bg-[#86B049] text-white shadow-sm" : "bg-white border border-[rgba(180,140,100,0.2)] text-[#8C7B6B]"
              }`}
            >
              <CheckCircle size={17} /> 成功
            </button>
            <button
              onClick={() => setSuccess(false)}
              className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold ${
                !success ? "bg-[#D9534F] text-white shadow-sm" : "bg-white border border-[rgba(180,140,100,0.2)] text-[#8C7B6B]"
              }`}
            >
              <XCircle size={17} /> 失败
            </button>
          </div>

          <section className={`bg-white rounded-2xl p-4 shadow-sm border ${!note ? "border-[#D9534F]/35" : "border-[rgba(180,140,100,0.1)]"}`}>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm font-bold text-[#2D2013]">{success ? "成功秘诀" : "失败原因"}</span>
              <span className="text-[#D9534F] text-sm font-bold">*</span>
            </div>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={success ? "例如：最后开盖收汁 8 分钟，肉皮更亮。" : "例如：老抽偏多，颜色发黑，下次减半。"}
              className="w-full text-sm text-[#2D2013] placeholder-[#C4B5A0] bg-[#FAFAF8] rounded-xl p-3 resize-none border border-[rgba(180,140,100,0.15)] focus:outline-none focus:border-[#FF6B35] transition-colors"
              rows={3}
            />
            {!note && <div className="text-xs text-[#D9534F] mt-2">总结让你成长，保存前需要填写。</div>}
          </section>

          <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
            <div className="text-sm font-bold text-[#2D2013] mb-2">自由笔记</div>
            <textarea
              placeholder="食客反馈、心情、临时调整都可以写在这里。"
              className="w-full text-sm text-[#2D2013] placeholder-[#C4B5A0] bg-[#FAFAF8] rounded-xl p-3 resize-none border border-[rgba(180,140,100,0.15)] focus:outline-none focus:border-[#FF6B35]"
              rows={3}
            />
          </section>

          <button className="w-full py-4 rounded-2xl bg-[#FF6B35] text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform">
            保存下厨记录
          </button>
        </div>
      )}
    </div>
  );
}

function GrowthScreen() {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <PageTitle title="成长档案" />
      <div className="px-5 space-y-5 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "下厨天数", value: "45", icon: Calendar },
            { label: "实践次数", value: "120", icon: UtensilsCrossed },
            { label: "掌握菜品", value: "15", icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-[rgba(180,140,100,0.1)]">
              <Icon size={18} className="mx-auto mb-1 text-[#FF6B35]" />
              <div className="text-2xl font-bold text-[#FF6B35]">{value}</div>
              <div className="text-[10px] text-[#8C7B6B] leading-tight mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="font-bold text-[#2D2013] text-base mb-3">拿手菜墙</h2>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="row-span-2 relative rounded-2xl overflow-hidden bg-[#F5EFE6]"
              style={{ boxShadow: "0 0 0 2px #F4A261, 0 4px 20px rgba(244,162,97,0.28)" }}
            >
              <img src={recipes[0].img} alt={recipes[0].name} className="w-full h-full object-cover min-h-[200px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute top-2 right-2 bg-[#F4A261] text-[#2D2013] text-[9px] font-bold px-2 py-0.5 rounded-full">王牌</div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white font-bold text-xs">{recipes[0].name}</div>
                <div className="text-white/80 text-[10px]">成功 {recipes[0].cookCount} 次</div>
              </div>
            </div>
            {recipes.slice(1, 5).map((recipe) => (
              <div key={recipe.id} className="relative rounded-2xl overflow-hidden bg-[#F5EFE6] h-[96px]">
                <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2">
                  <div className="text-white font-semibold text-[10px]">{recipe.name}</div>
                  <div className="text-white/75 text-[9px]">{recipe.cookCount} 次实践</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#2D2013] text-base">技能雷达</h2>
            <button className="text-xs font-bold text-[#FF6B35]">近30天</button>
          </div>
          <div className="h-40 flex items-center justify-center">
            <div className="relative w-36 h-36">
              <div className="absolute inset-2 rounded-full border border-[#F0EBE1]" />
              <div className="absolute inset-7 rounded-full border border-[#F0EBE1]" />
              <div
                className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B35]/20 border-2 border-[#FF6B35]"
                style={{ clipPath: "polygon(50% 0%, 88% 28%, 76% 86%, 22% 82%, 10% 30%)" }}
              />
              {["调味", "火候", "刀工", "摆盘", "还原"].map((label, index) => (
                <span
                  key={label}
                  className="absolute text-[10px] text-[#8C7B6B]"
                  style={{
                    left: ["45%", "82%", "70%", "12%", "3%"][index],
                    top: ["0%", "32%", "82%", "82%", "32%"][index],
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-[#FFF8F0] px-3 py-2 text-xs text-[#8C7B6B]">短板提示：还原度最近提升最快，火候仍建议重点复盘。</div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#2D2013] text-base">同一道菜对比</h2>
            <RefreshCw size={16} className="text-[#C4B5A0]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "第1次", score: "3.2", note: "偏咸，肉质略柴" },
              { title: "第18次", score: "4.8", note: "软糯入味，收汁稳定" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#FAFAF8] p-3">
                <div className="text-xs text-[#8C7B6B]">{item.title}</div>
                <div className="text-2xl font-bold text-[#FF6B35]">{item.score}</div>
                <div className="text-xs text-[#4A3828] mt-1">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-bold text-[#2D2013] text-base mb-3">成就徽章</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {badges.map((badge) => (
              <div key={badge.name} className="flex-shrink-0 flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                    badge.unlocked ? "bg-[#FFF0E8] shadow-sm" : "bg-[#F0EBE1] grayscale opacity-50"
                  }`}
                >
                  {badge.icon}
                </div>
                <span className={`text-[9px] text-center font-semibold w-16 leading-tight ${badge.unlocked ? "text-[#4A3828]" : "text-[#C4B5A0]"}`}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-bold text-[#2D2013] text-base mb-3">厨艺时间轴</h2>
          <div className="relative pl-5">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#F5EFE6]" />
            {[
              ["2026-06-10", "第一次请朋友吃饭，蒜香黄油虾获得一致好评。"],
              ["2026-05-28", "红烧肉第 5 次成功，正式加入拿手菜墙。"],
              ["2026-04-15", "累计完成第 100 次下厨记录。"],
            ].map(([date, text]) => (
              <div key={date} className="relative mb-3 last:mb-0">
                <div className="absolute -left-[13px] w-4 h-4 rounded-full bg-[#FF6B35]" />
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-[rgba(180,140,100,0.1)] ml-2">
                  <div className="text-[10px] text-[#8C7B6B] mb-0.5">{date}</div>
                  <div className="text-xs font-semibold text-[#2D2013]">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ToolsScreen() {
  const [checked, setChecked] = useState<string[]>(["五花肉 500g", "冰糖"]);

  const toggle = (item: string) => {
    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <PageTitle title="辅助工具" />
      <div className="px-5 space-y-4 pb-6">
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-[#2D2013] text-base">食材购物清单</h2>
              <div className="text-xs text-[#8C7B6B]">从 3 道菜生成，已购买项自动折叠到底部</div>
            </div>
            <ShoppingCart size={20} className="text-[#FF6B35]" />
          </div>
          {shoppingGroups.map((group) => (
            <div key={group.title} className="mb-3 last:mb-0">
              <div className="sticky top-0 text-xs font-bold text-[#8C7B6B] mb-1">{group.title}</div>
              {group.items.map((item) => {
                const done = checked.includes(item);
                return (
                  <button key={item} onClick={() => toggle(item)} className="w-full flex items-center gap-2 py-2 text-left">
                    <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${done ? "bg-[#86B049] border-[#86B049]" : "border-[#C4B5A0]"}`}>
                      {done && <Check size={13} className="text-white" />}
                    </span>
                    <span className={`text-sm ${done ? "text-[#C4B5A0] line-through" : "text-[#2D2013]"}`}>{item}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[rgba(180,140,100,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#2D2013] text-base">挑战与目标</h2>
            <Target size={18} className="text-[#FF6B35]" />
          </div>
          {[
            ["本周学会水煮肉片", 70],
            ["一个月新增 5 道拿手菜", 40],
          ].map(([title, progress]) => (
            <div key={title.toString()} className="mb-3 last:mb-0">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-[#2D2013]">{title}</span>
                <span className="text-[#8C7B6B]">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#F5EFE6] overflow-hidden">
                <div className="h-full rounded-full bg-[#FF6B35]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-[#FFF8F0] border border-[rgba(255,107,53,0.18)] p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-[#FF6B35] mt-0.5" />
            <div>
              <div className="font-bold text-[#2D2013] text-sm">备份提醒</div>
              <div className="text-xs text-[#8C7B6B] mt-1">距离上次导出已 7 天，建议导出一份成长档案以防丢失。</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [appLock, setAppLock] = useState(true);
  const [sheet, setSheet] = useState<"export" | "import" | null>(null);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors ${value ? "bg-[#FF6B35]" : "bg-[#E0D5C5]"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      <PageTitle title="设置" />
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 scrollbar-hide">
        <section>
          <div className="text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-2 px-1">数据管理</div>
          <div className="bg-white rounded-2xl shadow-sm border border-[rgba(180,140,100,0.1)] overflow-hidden">
            <button onClick={() => setSheet("export")} className="w-full flex items-center px-4 py-3.5 border-b border-[rgba(180,140,100,0.08)]">
              <Download size={16} className="text-[#FF6B35] mr-3" />
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-[#2D2013]">导出成长档案</div>
                <div className="text-[11px] text-[#8C7B6B]">上次备份：2026-06-01</div>
              </div>
              <ChevronRight size={16} className="text-[#C4B5A0]" />
            </button>
            <button onClick={() => setSheet("import")} className="w-full flex items-center px-4 py-3.5 border-b border-[rgba(180,140,100,0.08)]">
              <Upload size={16} className="text-[#8C7B6B] mr-3" />
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-[#2D2013] flex items-center gap-1.5">
                  导入备份包
                  <AlertCircle size={13} className="text-[#D9534F]" />
                </div>
              </div>
              <ChevronRight size={16} className="text-[#C4B5A0]" />
            </button>
            <div className="flex items-center px-4 py-3.5">
              <FileArchive size={16} className="text-[#8C7B6B] mr-3" />
              <span className="flex-1 text-sm font-semibold text-[#2D2013]">关闭 App 时自动本地备份</span>
              <Toggle value={autoBackup} onChange={() => setAutoBackup(!autoBackup)} />
            </div>
          </div>
        </section>

        <section>
          <div className="text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-2 px-1">隐私安全</div>
          <div className="bg-white rounded-2xl shadow-sm border border-[rgba(180,140,100,0.1)] overflow-hidden">
            <div className="flex items-center px-4 py-3.5">
              <LockKeyhole size={16} className="text-[#8C7B6B] mr-3" />
              <span className="flex-1 text-sm font-semibold text-[#2D2013]">应用锁（面容 / 指纹）</span>
              <Toggle value={appLock} onChange={() => setAppLock(!appLock)} />
            </div>
          </div>
        </section>

        <section>
          <div className="text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-2 px-1">关于</div>
          <div className="bg-white rounded-2xl shadow-sm border border-[rgba(180,140,100,0.1)] overflow-hidden">
            <div className="flex items-center px-4 py-3.5 border-b border-[rgba(180,140,100,0.08)]">
              <Info size={16} className="text-[#8C7B6B] mr-3" />
              <span className="flex-1 text-sm font-semibold text-[#2D2013]">版本</span>
              <span className="text-sm text-[#8C7B6B]">1.0.0</span>
            </div>
            <button className="w-full flex items-center px-4 py-3.5">
              <Shield size={16} className="text-[#8C7B6B] mr-3" />
              <span className="flex-1 text-left text-sm font-semibold text-[#2D2013]">隐私说明</span>
              <ChevronRight size={16} className="text-[#C4B5A0]" />
            </button>
          </div>
        </section>
      </div>

      {sheet === "export" && <ExportSheet onClose={() => setSheet(null)} />}
      {sheet === "import" && <ImportSheet onClose={() => setSheet(null)} />}
    </div>
  );
}

function ExportSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 rounded-[44px]" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#E0D5C5] rounded-full mx-auto mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] flex items-center justify-center">
            <Download size={20} className="text-[#FF6B35]" />
          </div>
          <div>
            <div className="font-bold text-[#2D2013] text-sm">导出成长档案</div>
            <div className="text-xs text-[#8C7B6B]">120 条记录、500 张照片，约 1.2GB</div>
          </div>
        </div>
        {["扫描数据", "压缩媒体", "生成 私厨备份_20260620_184500.zip"].map((item, index) => (
          <div key={item} className="flex items-center gap-2 mb-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${index < 2 ? "bg-[#86B049]" : "bg-[#FFF0E8]"}`}>
              {index < 2 ? <Check size={12} className="text-white" /> : <RefreshCw size={12} className="text-[#FF6B35]" />}
            </div>
            <span className="text-xs text-[#4A3828]">{item}</span>
          </div>
        ))}
        <div className="w-full h-2.5 bg-[#F5EFE6] rounded-full overflow-hidden mt-3 mb-2">
          <div className="h-full bg-[#FF6B35] rounded-full transition-all" style={{ width: "72%" }} />
        </div>
        <div className="flex justify-between text-xs text-[#8C7B6B] mb-4">
          <span>72% 完成</span>
          <span>剩余约 1 分钟</span>
        </div>
        <button className="w-full py-3 rounded-2xl bg-[#FF6B35] text-white text-sm font-bold">保存到文件 / 分享</button>
      </div>
    </div>
  );
}

function ImportSheet({ onClose }: { onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const confirmed = confirmText === "确认覆盖";

  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 rounded-[44px]" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#E0D5C5] rounded-full mx-auto mb-4" />
        <div className="rounded-2xl border border-[#D9534F]/35 bg-[#FFF8F8] p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#D9534F] mt-0.5" />
            <div>
              <div className="font-bold text-[#2D2013] text-sm">导入将覆盖当前设备数据</div>
              <div className="text-xs text-[#8C7B6B] mt-1">选择 zip 后会校验 data.json 与 media 文件夹，确认后清空当前记录并恢复备份内容。</div>
            </div>
          </div>
        </div>
        <input
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
          className="mt-4 w-full rounded-2xl bg-[#FAFAF8] border border-[rgba(180,140,100,0.15)] px-3 py-3 text-sm focus:outline-none focus:border-[#D9534F]"
          placeholder="输入“确认覆盖”以继续"
        />
        <button
          className={`mt-3 w-full py-3 rounded-2xl text-sm font-bold ${confirmed ? "bg-[#D9534F] text-white" : "bg-[#F0EBE1] text-[#C4B5A0]"}`}
        >
          校验并导入备份
        </button>
      </div>
    </div>
  );
}

const navItems = [
  { id: "recipes" as Screen, label: "菜谱", icon: BookOpen },
  { id: "cook" as Screen, label: "下厨", icon: UtensilsCrossed },
  { id: "growth" as Screen, label: "成长", icon: TrendingUp },
  { id: "tools" as Screen, label: "工具", icon: ListChecks },
  { id: "settings" as Screen, label: "设置", icon: Settings },
];

export default function App() {
  const [tab, setTab] = useState<Screen>("recipes");
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8DDD0] flex items-center justify-center p-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div
        className="relative w-[390px] h-[844px] bg-[#FAFAF8] overflow-hidden flex flex-col"
        style={{
          borderRadius: "44px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <PhoneHeader />
        <div className="flex-1 overflow-hidden relative">
          {tab === "recipes" && !showDetail && <RecipeListScreen onSelect={() => setShowDetail(true)} />}
          {tab === "recipes" && showDetail && <RecipeDetailScreen onBack={() => setShowDetail(false)} />}
          {tab === "cook" && <CookRecordScreen />}
          {tab === "growth" && <GrowthScreen />}
          {tab === "tools" && <ToolsScreen />}
          {tab === "settings" && <SettingsScreen />}
        </div>
        <div
          className="flex-shrink-0 bg-white border-t border-[rgba(180,140,100,0.12)] pb-5 pt-2 px-2"
          style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}
        >
          <div className="flex">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  setShowDetail(false);
                }}
                className="flex-1 flex flex-col items-center gap-1 py-1 transition-all"
              >
                <div className={`w-10 h-6 rounded-full flex items-center justify-center transition-all ${tab === id ? "bg-[#FFF0E8]" : ""}`}>
                  <Icon size={18} className={tab === id ? "text-[#FF6B35]" : "text-[#C4B5A0]"} />
                </div>
                <span className={`text-[10px] font-semibold ${tab === id ? "text-[#FF6B35]" : "text-[#C4B5A0]"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
